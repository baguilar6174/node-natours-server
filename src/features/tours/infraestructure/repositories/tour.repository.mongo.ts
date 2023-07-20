import mongoose, { Model } from 'mongoose';
import { CreateTourDTO, Tour, Stat, Plan } from '../../domain/entities/tour.entity';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';
import { TourModel } from '../models/tour.model';
import { DEV_ENVIRONMENT, EMPTY_STRING, ONE, ONE_HUNDRED, PROD_ENVIRONMENT, ZERO } from '../../../../core/constants';
import { TOURS_DATA } from '../constants/tours-simple';
import { ApiFeatures } from '../../../../core/types';
import { parseQuery } from '../../../../core/utils';

export class MongoTourRepository implements TourRepositoryPort {
	async seed(): Promise<string | void> {
		if (process.env.NODE_ENV === PROD_ENVIRONMENT) return 'No access to this endpoint';
		await connect();
		await TourModel.deleteMany();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const tours = TOURS_DATA.map(({ _id, ...rest }): CreateTourDTO => rest);
		await TourModel.insertMany(tours);
		await disconnect();
		return 'Created data';
	}

	async create(data: CreateTourDTO): Promise<Tour> {
		await connect();
		const tour = await TourModel.create(data);
		await disconnect();
		return tour;
	}

	async delete(id: string): Promise<Tour | null> {
		await connect();
		const deletedTour = await TourModel.findByIdAndDelete(id);
		await disconnect();
		return deletedTour;
	}

	async update(id: string, data: Partial<Omit<Tour, '_id'>>): Promise<Tour | null> {
		await connect();
		const updatedTour = await TourModel.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		await disconnect();
		return updatedTour;
	}

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		await connect();
		const results = await apiFeatures(TourModel, features);
		await disconnect();
		return results;
	}

	async getOne(id: string): Promise<Tour | null> {
		await connect();
		const tour = await TourModel.findById(id);
		await disconnect();
		return tour;
	}

	async getStats(): Promise<Stat[]> {
		await connect();
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
		await disconnect();
		return results;
	}

	async getMonthlyPlan(year: number): Promise<Plan[]> {
		await connect();
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
		await disconnect();
		return results;
	}
}

/** 0 disconnected | 1 connected | 2 connecting | 3 disconnecting */

const mongoConnection = { isConnected: 0 };

const connect = async (): Promise<void> => {
	if (mongoConnection.isConnected) return;
	if (mongoose.connections.length > ZERO) {
		mongoConnection.isConnected = mongoose.connections[ZERO].readyState;
		if (mongoConnection.isConnected === ONE) return;
		await mongoose.disconnect();
	}
	await mongoose.connect(process.env.MONGO_URL || '');
	mongoConnection.isConnected = 1;
	console.log('Connected with MongoBD', process.env.MONGO_URL);
};

const disconnect = async (): Promise<void> => {
	if (process.env.NODE_ENV === DEV_ENVIRONMENT) return;
	if (mongoConnection.isConnected === ZERO) return;
	await mongoose.disconnect();
	mongoConnection.isConnected = 0;
	console.log('Diconnected from MongoBD');
};

async function apiFeatures(model: Model<Tour>, features: ApiFeatures): Promise<Tour[]> {
	const { query = {}, pagination, sort, fields = EMPTY_STRING } = features;

	const filteringQuery = parseQuery(query);

	const page = Number(pagination?.page) || ONE;
	const limit = Number(pagination?.limit) || ONE_HUNDRED;
	const skip = (page - ONE) * limit;

	if (pagination) {
		const numTours = await TourModel.countDocuments();
		if (skip >= numTours) throw new Error('This page does not exist');
	}

	const result = await model
		.find({ ...filteringQuery })
		.sort(typeof sort === 'string' ? sort.split(',').join(EMPTY_STRING) : sort)
		.sort('-createdAt')
		.select(fields.split(',').join(EMPTY_STRING))
		.select('-__v')
		.limit(limit)
		.skip(skip)
		.exec();

	return result;
}
