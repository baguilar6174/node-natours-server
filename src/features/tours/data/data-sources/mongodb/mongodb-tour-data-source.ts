import mongoose from 'mongoose';

import { CreateTourDTO, Tour } from '../../../domain/entities/tour.entity';
import { TourDataSource } from '../../interfaces/data-sources/tour-data-source';
import { TourModel } from '../../models/tour.model';
import { TOURS_DATA } from '../../constants/tours-simple';
import { SortType } from '../../../../../core/types';

export class MongoDBTourDataSource implements TourDataSource {
	async seed(): Promise<string> {
		if (process.env.NODE_ENV === 'production') return 'No access to this endpoint';
		await connect();
		await TourModel.deleteMany();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const tours = TOURS_DATA.map(({ _id, ...rest }): CreateTourDTO => rest);
		await TourModel.insertMany(tours);
		await disconnect();
		return 'Created data';
	}

	async deleteOne(id: string): Promise<Tour | null> {
		await connect();
		const deletedTour = await TourModel.findByIdAndDelete(id);
		await disconnect();
		return deletedTour;
	}

	async updateOne(id: string, data: Tour): Promise<Tour | null> {
		await connect();
		const updatedTour = await TourModel.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		await disconnect();
		return updatedTour;
	}

	async getOne(id: string): Promise<Tour | null> {
		await connect();
		const tour = await TourModel.findById(id);
		await disconnect();
		return tour;
	}

	async create(data: Tour): Promise<Tour> {
		await connect();
		const tour = await TourModel.create({ ...data });
		await disconnect();
		return tour;
	}

	async getAll(query?: object, sort?: string | SortType): Promise<Tour[]> {
		await connect();
		let queryGetAll = TourModel.find({ ...query });
		if (sort) {
			if (typeof sort === 'string') {
				const sortBy = sort.split(',').join(' ');
				queryGetAll = queryGetAll.sort(sortBy);
			} else {
				queryGetAll = queryGetAll.sort(sort);
			}
		} else {
			queryGetAll = queryGetAll.sort('-createdAt');
		}
		const results = await queryGetAll;
		await disconnect();
		return results;
	}
}

/**
 * 0 is disconnected
 * 1 is connected
 * 2 is connecting
 * 3 is disconnecting
 */
const mongoConnection = {
	isConnected: 0
};

export const connect = async () => {
	if (mongoConnection.isConnected) return;
	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;
		if (mongoConnection.isConnected === 1) return;
		await mongoose.disconnect();
	}
	await mongoose.connect(process.env.MONGO_URL || '');
	mongoConnection.isConnected = 1;
	console.log('Connected with MongoBD', process.env.MONGO_URL);
};

export const disconnect = async () => {
	if (process.env.NODE_ENV === 'development') return;
	if (mongoConnection.isConnected === 0) return;
	await mongoose.disconnect();
	mongoConnection.isConnected = 0;
	console.log('Diconnected from MongoBD');
};
