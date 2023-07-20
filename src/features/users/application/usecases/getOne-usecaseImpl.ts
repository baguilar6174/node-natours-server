import { User } from '../../domain/models/user.model';
import { GetOneUserUseCase } from '../../domain/ports/inputs/getOne-usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repositoryPort';

export class GetOneUserUseCaseImpl implements GetOneUserUseCase {
	constructor(public repositoryPort: UserRepositoryPort) {}

	async getOne(id: string): Promise<User | null> {
		const result = await this.repositoryPort.getOne(id);
		return result;
	}
}
