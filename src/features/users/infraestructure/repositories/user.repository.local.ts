/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

import { ApiFeatures } from '../../../../core/types';
import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';

export class LocalUserRepository implements UserRepositoryPort {
	async create(data: CreateUserDTO): Promise<User> {
		const id = uuidv4();
		const newUser = Object.assign({ _id: id }, data);
		return newUser;
	}

	async delete(_id: string): Promise<User | null> {
		return null;
	}

	async update(_id: string, _data: Partial<Omit<User, '_id'>>): Promise<User | null> {
		return null;
	}

	async getAll(_features: ApiFeatures): Promise<User[]> {
		return [];
	}

	async getOne(_id: string): Promise<User | null> {
		return null;
	}
}
