import { Entities, HttpCode } from '../../../../core/constants';
import { ApiFeatures } from '../../../../core/types';
import { apiFeatures, connectMongoDB, disconnectMongoDB } from '../../../../core/utils';
import { AppError } from '../../../../core/error/app-error';
import { Booking, BookingRepositoryPort, CreateBookingDTO } from '../../domain';
import { BookingModel } from '../models';

export class MongoBookingRepository implements BookingRepositoryPort {
	async create(data: CreateBookingDTO): Promise<Booking> {
		await connectMongoDB();
		// TODO: validate if tour exist before create Booking
		const result = await BookingModel.create(data);
		await disconnectMongoDB();
		return result;
	}

	async getAll(features: ApiFeatures): Promise<Booking[]> {
		await connectMongoDB();
		const results = await apiFeatures(BookingModel, features);
		await disconnectMongoDB();
		return results;
	}

	async getOne(id: string): Promise<Booking | null> {
		await connectMongoDB();
		const result = await BookingModel.findById(id);
		if (!result) {
			throw new AppError({
				message: `No ${Entities.BOOKING} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await disconnectMongoDB();
		return result;
	}
}
