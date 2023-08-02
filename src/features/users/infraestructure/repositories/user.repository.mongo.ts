import { ApiFeatures } from '../../../../core/types';
import { User } from '../../domain/entities';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';
import { UserModel } from '../models/user.model';
import { Entities, HttpCode } from '../../../../core/constants';
import { apiFeatures, connectMongoDB, disconnectMongoDB } from '../../../../core/utils';
import { AppError } from '../../../../core/error/app-error';

export class MongoUserRepository implements UserRepositoryPort {
	async getAll(features: ApiFeatures): Promise<User[]> {
		await connectMongoDB();
		const results = await apiFeatures(UserModel, features);
		await disconnectMongoDB();
		return results;
	}

	async getOne(id: string): Promise<User | null> {
		await connectMongoDB();
		const result = await UserModel.findById(id);
		if (!result) {
			throw new AppError({
				message: `No ${Entities.USER} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await disconnectMongoDB();
		return result;
	}
}
