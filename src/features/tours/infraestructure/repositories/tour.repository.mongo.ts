import {
	CreateTourDTO,
	Tour,
	Stat,
	Plan,
	UpdateTourDTO,
	CloseTourParameters,
	Distance
} from '../../domain/entities/tour.entity';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';
import { TourModel } from '../models/tour.model';
import { Entities, HttpCode, PROD_ENVIRONMENT } from '../../../../core/constants';
import { TOURS_DATA } from '../constants/tours';
import { ApiFeatures } from '../../../../core/types';
import {
	apiFeatures,
	connectMongoDB,
	disconnectMongoDB,
	getDistanceMultiplier,
	getEarthRadious
} from '../../../../core/utils';
import { AppError } from '../../../../core/error/app-error';
import EnvConfig from '../../../../core/config/env.config';

export class MongoTourRepository implements TourRepositoryPort {
	async seed(): Promise<string | void> {
		if (EnvConfig.NODE_ENV === PROD_ENVIRONMENT) return 'No access to this endpoint';
		await connectMongoDB();
		await TourModel.deleteMany();
		await TourModel.insertMany(TOURS_DATA);
		await disconnectMongoDB();
		return 'Created data';
	}

	async create(data: CreateTourDTO): Promise<Tour> {
		await connectMongoDB();
		const result = await TourModel.create(data);
		await disconnectMongoDB();
		return result;
	}

	async delete(id: string): Promise<Tour | null> {
		await connectMongoDB();
		const result = await TourModel.findByIdAndDelete(id);
		if (!result) {
			throw new AppError({
				message: `No ${Entities.TOUR} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await disconnectMongoDB();
		return result;
	}

	async update(id: string, data: UpdateTourDTO): Promise<Tour | null> {
		await connectMongoDB();
		const result = await TourModel.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		if (!result) {
			throw new AppError({
				message: `No ${Entities.TOUR} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await disconnectMongoDB();
		return result;
	}

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		await connectMongoDB();
		const results = await apiFeatures(TourModel, features);
		await disconnectMongoDB();
		return results;
	}

	async getOne(id: string): Promise<Tour | null> {
		await connectMongoDB();
		const result = await TourModel.findById(id).populate('reviews');
		if (!result) {
			throw new AppError({
				message: `No ${Entities.TOUR} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await disconnectMongoDB();
		return result;
	}

	async getCloserTours(params: CloseTourParameters): Promise<Tour[]> {
		const {
			center: { lat, lng },
			distance,
			unit
		} = params;
		if (!lat || !lng) {
			throw new AppError({
				message: 'Please provide lat and lng in the format lat,lng',
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await connectMongoDB();
		const result = TourModel.find({
			startLocation: {
				$geoWithin: {
					$centerSphere: [[lng, lat], getEarthRadious(distance, unit)]
				}
			}
		});
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

	async getDistances(params: Omit<CloseTourParameters, 'distance'>): Promise<Distance[]> {
		const {
			center: { lat, lng },
			unit
		} = params;
		if (!lat || !lng) {
			throw new AppError({
				message: 'Please provide lat and lng in the format lat,lng',
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await connectMongoDB();
		const result = TourModel.aggregate([
			{
				$geoNear: {
					near: {
						type: 'Point',
						coordinates: [lng, lat]
					},
					distanceField: 'distance',
					distanceMultiplier: getDistanceMultiplier(unit)
				}
			},
			{
				$project: {
					distance: 1,
					name: 1
				}
			}
		]);
		await disconnectMongoDB();
		return result;
	}
}
