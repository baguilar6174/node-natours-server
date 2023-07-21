import { CreateTourDTO, Tour, Stat, Plan } from '../../domain/entities/tour.entity';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';
import { TourModel } from '../models/tour.model';
import { EMPTY_STRING, ONE, ONE_HUNDRED, PROD_ENVIRONMENT } from '../../../../core/constants';
import { TOURS_DATA } from '../constants/tours-simple';
import { ApiFeatures } from '../../../../core/types';
import { connectMongoDB, disconnectMongoDB, parseQuery } from '../../../../core/utils';
import EnvConfig from '../../../../core/env.config';

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
		const tour = await TourModel.create(data);
		await disconnectMongoDB();
		return tour;
	}

	async delete(id: string): Promise<Tour | null> {
		await connectMongoDB();
		const deletedTour = await TourModel.findByIdAndDelete(id);
		await disconnectMongoDB();
		return deletedTour;
	}

	async update(id: string, data: Partial<Omit<Tour, '_id'>>): Promise<Tour | null> {
		await connectMongoDB();
		const updatedTour = await TourModel.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		await disconnectMongoDB();
		return updatedTour;
	}

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		await connectMongoDB();
		const results = await apiFeatures(features);
		await disconnectMongoDB();
		return results;
	}

	async getOne(id: string): Promise<Tour | null> {
		await connectMongoDB();
		const tour = await TourModel.findById(id);
		await disconnectMongoDB();
		return tour;
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

// TODO: make generic function
async function apiFeatures(features: ApiFeatures): Promise<Tour[]> {
	const { query = {}, pagination, sort, fields = EMPTY_STRING } = features;

	const filteringQuery = parseQuery(query);

	const page = Number(pagination?.page) || ONE;
	const limit = Number(pagination?.limit) || ONE_HUNDRED;
	const skip = (page - ONE) * limit;

	if (pagination) {
		const numTours = await TourModel.countDocuments();
		if (skip >= numTours) throw new Error('This page does not exist');
	}

	const result = await TourModel.find({ ...filteringQuery })
		.sort(typeof sort === 'string' ? sort.split(',').join(EMPTY_STRING) : sort)
		.sort('-createdAt')
		.select(fields.split(',').join(EMPTY_STRING))
		.select('-__v')
		.limit(limit)
		.skip(skip)
		.exec();

	return result;
}
