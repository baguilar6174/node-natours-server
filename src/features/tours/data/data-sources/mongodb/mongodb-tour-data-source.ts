import mongoose from 'mongoose';

import { Tour } from '../../../domain/entities/tour.entity';
import { TourDataSource } from '../../interfaces/data-sources/tour-data-source';
import { TourModel } from '../../models/tour.model';

export class MongoDBTourDataSource implements TourDataSource {
	async deleteOne(id: string): Promise<Tour | null> {
		await connect();
		const tour = await TourModel.findById(id);
		if (!tour) {
			await disconnect();
			return null;
		}
		const deletedTour = await tour.deleteOne();
		await disconnect();
		return deletedTour;
	}

	async updateOne(id: string, data: Tour): Promise<Tour | null> {
		await connect();
		const tour = await TourModel.findById(id);
		if (!tour) {
			await disconnect();
			return null;
		}
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
		const tour = new TourModel({ ...data });
		await tour.save();
		await disconnect();
		return tour;
	}

	async getAll(): Promise<Tour[]> {
		await connect();
		const result = await TourModel.find();
		await disconnect();
		return result;
	}
}

/**
 * 0 is disconnected
 * 1 is connected
 * 2 is connecting
 * 3 is disconnecting
 *
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
