import { CreateTourDTO, Tour, Stat, Plan } from '../../domain/entities/tour.entity';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';
import { TourModel } from '../models/tour.model';
import { HttpCode, PROD_ENVIRONMENT } from '../../../../core/constants';
import { TOURS_DATA } from '../constants/tours-simple';
import { ApiFeatures } from '../../../../core/types';
import { apiFeatures, connectMongoDB, disconnectMongoDB } from '../../../../core/utils';
import EnvConfig from '../../../../core/env.config';
import { AppError } from '../../../../core/error/app-error';

export class MongoTourRepository implements TourRepositoryPort {
	async seed(): Promise<string | void> {
		if (EnvConfig.NODE_ENV === PROD_ENVIRONMENT) return 'No access to this endpoint';
		await connectMongoDB();
		await TourModel.deleteMany();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const tours = TOURS_DATA.map(({ _id, ...rest }): CreateTourDTO => rest);
		await TourModel.insertMany(tours);
		await disconnectMongoDB();
		return 'Created data';
	}

	async create(data: CreateTourDTO): Promise<Tour> {
		await connectMongoDB();
		const document = await TourModel.create(data);
		const result: Tour = document.toObject();
		await disconnectMongoDB();
		return result;
	}

	async delete(id: string): Promise<Tour | null> {
		await connectMongoDB();
		const document = await TourModel.findByIdAndDelete(id);
		if (!document) {
			throw new AppError({
				message: `No tour with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		const result: Tour = document.toObject();
		await disconnectMongoDB();
		return result;
	}

	async update(id: string, data: Partial<Omit<Tour, '_id'>>): Promise<Tour | null> {
		await connectMongoDB();
		const document = await TourModel.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		if (!document) {
			throw new AppError({
				message: `No tour with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		const result: Tour = document.toObject();
		await disconnectMongoDB();
		return result;
	}

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		await connectMongoDB();
		const documents = await apiFeatures(TourModel, features);
		const results: Tour[] = documents.map((el) => el.toObject());
		await disconnectMongoDB();
		return results;
	}

	async getOne(id: string): Promise<Tour | null> {
		await connectMongoDB();
		const document = await TourModel.findById(id);
		if (!document) {
			throw new AppError({
				message: `No tour with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		const result: Tour = document.toObject();
		await disconnectMongoDB();
		return result;
	}

	async getStats(): Promise<Stat[]> {
		await connectMongoDB();
		const results = await TourModel.aggregate([
			{
				$match: {
					ratingsAverage: { $gte: 4.5 }
				}
			},
			{
				$group: {
					_id: { $toUpper: '$difficulty' },
					numTours: { $sum: 1 },
					numRating: { $sum: '$ratingsQuantity' },
					avgRating: { $avg: '$ratingsAverage' },
					avgPrice: { $avg: '$price' },
					minPrice: { $min: '$price' },
					maxPrice: { $max: '$price' }
				}
			},
			{
				$sort: { avgPrice: 1 }
			}
		]);
		await disconnectMongoDB();
		return results;
	}

	async getMonthlyPlan(year: number): Promise<Plan[]> {
		await connectMongoDB();
		const results = await TourModel.aggregate([
			{ $unwind: '$startDates' },
			{
				$match: {
					startDates: {
						$gte: new Date(`${year}-01-01`),
						$lte: new Date(`${year}-12-31`)
					}
				}
			},
			{
				$group: {
					_id: { $month: '$startDates' },
					numToursStarts: { $sum: 1 },
					tours: { $push: '$name' }
				}
			},
			{ $addFields: { month: '$_id' } },
			{ $project: { _id: 0 } },
			{ $sort: { numToursStarts: -1 } },
			{ $limit: 12 }
		]);
		await disconnectMongoDB();
		return results;
	}
}
