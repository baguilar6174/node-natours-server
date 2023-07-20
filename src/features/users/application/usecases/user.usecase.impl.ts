import { ApiFeatures } from '../../../../core/types';
import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { UserUseCase } from '../../domain/ports/inputs/user.usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';

export class UserUseCaseImpl implements UserUseCase {
	private repositoryPort: UserRepositoryPort;

	constructor(repositoryPort: UserRepositoryPort) {
		this.repositoryPort = repositoryPort;
	}

	async create(user: CreateUserDTO): Promise<User> {
		const result = await this.repositoryPort.create(user);
		return result;
	}

	async deleteOne(id: string): Promise<User | null> {
		const result = await this.repositoryPort.delete(id);
		return result;
	}

	async getAll(features: ApiFeatures): Promise<User[]> {
		const result = await this.repositoryPort.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<User | null> {
		const result = await this.repositoryPort.getOne(id);
		return result;
	}

	async update(id: string, data: Partial<Omit<User, '_id'>>): Promise<User | null> {
		const result = await this.repositoryPort.update(id, data);
		return result;
	}
}
