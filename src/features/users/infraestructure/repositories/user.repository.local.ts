/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiFeatures } from '../../../../core/types';
import { User } from '../../domain/entities';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';

export class LocalUserRepository implements UserRepositoryPort {
	async getAll(_features: ApiFeatures): Promise<User[]> {
		return [];
	}

	async getOne(_id: string): Promise<User | null> {
		return null;
	}
}
