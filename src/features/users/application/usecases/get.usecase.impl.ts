import { ApiFeatures } from '../../../../core/types';
import { User } from '../../domain/entities/user.entity';
import { GetUsersUseCase } from '../../domain/ports/inputs';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';

export class GetUsersUseCaseImpl implements GetUsersUseCase {
	constructor(private repositoryPort: UserRepositoryPort) {}

	async getAll(features: ApiFeatures): Promise<User[]> {
		const result = await this.repositoryPort.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<User | null> {
		const result = await this.repositoryPort.getOne(id);
		return result;
	}
}
