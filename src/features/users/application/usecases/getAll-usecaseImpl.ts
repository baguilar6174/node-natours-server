import { ApiFeatures } from '../../../../core/types';
import { User } from '../../domain/models/user.model';
import { GetAllUsersUseCase } from '../../domain/ports/inputs/getAll-usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repositoryPort';

export class GetAllUsersUseCaseImpl implements GetAllUsersUseCase {
	constructor(public repositoryPort: UserRepositoryPort) {}

	async getAll(features: ApiFeatures): Promise<User[]> {
		const result = await this.repositoryPort.getAll(features);
		return result;
	}
}
