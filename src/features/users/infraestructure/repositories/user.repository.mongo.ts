import { ApiFeatures } from '../../../../core/types';
import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';
import { UserModel } from '../models/user.model';
import { Entities, HttpCode } from '../../../../core/constants';
import { apiFeatures, connectMongoDB, disconnectMongoDB } from '../../../../core/utils';
import { AppError } from '../../../../core/error/app-error';

export class MongoUserRepository implements UserRepositoryPort {
	async create(data: CreateUserDTO): Promise<User> {
		await connectMongoDB();
		const document = await UserModel.create(data);
		const result: User = document.toObject();
		await disconnectMongoDB();
		return result;
	}

	async delete(id: string): Promise<User | null> {
		await connectMongoDB();
		const document = await UserModel.findByIdAndDelete(id);
		if (!document) {
			throw new AppError({
				message: `No ${Entities.USER} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		const result: User = document.toObject();
		await disconnectMongoDB();
		return result;
	}

	async update(id: string, data: Partial<Omit<User, '_id'>>): Promise<User | null> {
		await connectMongoDB();
		const document = await UserModel.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		if (!document) {
			throw new AppError({
				message: `No ${Entities.USER} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		const result: User = document.toObject();
		await disconnectMongoDB();
		return result;
	}

	async getAll(features: ApiFeatures): Promise<User[]> {
		await connectMongoDB();
		const documents = await apiFeatures(UserModel, features);
		const results: User[] = documents.map((el) => el.toObject());
		await disconnectMongoDB();
		return results;
	}

	async getOne(id: string): Promise<User | null> {
		await connectMongoDB();
		const document = await UserModel.findById(id);
		if (!document) {
			throw new AppError({
				message: `No ${Entities.USER} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		const result: User = document.toObject();
		await disconnectMongoDB();
		return result;
	}
}
