import { User } from '../../domain/models/user.model';
import { DeleteUserUseCase } from '../../domain/ports/inputs/delete-usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repositoryPort';

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
	constructor(public repositoryPort: UserRepositoryPort) {}

	async deleteOne(id: string): Promise<User | null> {
		const result = await this.repositoryPort.delete(id);
		return result;
	}
}
