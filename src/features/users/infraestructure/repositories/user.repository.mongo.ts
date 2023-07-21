import { ApiFeatures } from '../../../../core/types';
import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';
import { UserModel } from '../models/user.model';
import { EMPTY_STRING, HttpCode, ONE, ONE_HUNDRED } from '../../../../core/constants';
import { connectMongoDB, disconnectMongoDB, parseQuery } from '../../../../core/utils';
import { AppError } from '../../../../core/error/app-error';

export class MongoUserRepository implements UserRepositoryPort {
	async create(data: CreateUserDTO): Promise<User> {
		await connectMongoDB();
		const userDocument = await UserModel.create(data);
		const user: User = userDocument.toObject();
		await disconnectMongoDB();
		return user;
	}

	async delete(id: string): Promise<User | null> {
		await connectMongoDB();
		const userDocument = await UserModel.findByIdAndDelete(id);
		if (!userDocument) {
			throw new AppError({
				message: `No user with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}
		const user: User = userDocument.toObject();
		await disconnectMongoDB();
		return user;
	}

	async update(id: string, data: Partial<Omit<User, '_id'>>): Promise<User | null> {
		await connectMongoDB();
		const userDocument = await UserModel.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		if (!userDocument) {
			throw new AppError({
				message: `No user with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}
		const user: User = userDocument.toObject();
		await disconnectMongoDB();
		return user;
	}

	async getAll(features: ApiFeatures): Promise<User[]> {
		await connectMongoDB();
		const usersDocuments = await apiFeatures(features);
		await disconnectMongoDB();
		return usersDocuments;
	}

	async getOne(id: string): Promise<User | null> {
		await connectMongoDB();
		const userDocument = await UserModel.findById(id);
		if (!userDocument) {
			throw new AppError({
				message: `No user with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}
		const user: User = userDocument.toObject();
		await disconnectMongoDB();
		return user;
	}
}

// TODO: make generic function
async function apiFeatures(features: ApiFeatures): Promise<User[]> {
	const { query = {}, pagination, sort, fields = EMPTY_STRING } = features;

	const filteringQuery = parseQuery(query);

	const page = Number(pagination?.page) || ONE;
	const limit = Number(pagination?.limit) || ONE_HUNDRED;
	const skip = (page - ONE) * limit;

	if (pagination) {
		const numTours = await UserModel.countDocuments();
		if (skip >= numTours) throw new Error('This page does not exist');
	}

	const result = await UserModel.find({ ...filteringQuery })
		.sort(typeof sort === 'string' ? sort.split(',').join(EMPTY_STRING) : sort)
		.sort('-createdAt')
		.select(fields.split(',').join(EMPTY_STRING))
		.select('-__v')
		.limit(limit)
		.skip(skip)
		.exec();

	const users: User[] = result.map((user) => user.toObject());
	return users;
}
