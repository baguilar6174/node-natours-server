import { User } from '../../domain/entities/user.entity';
import { DeleteUserUseCase } from '../../domain/ports/inputs/delete.usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
	constructor(private repositoryPort: UserRepositoryPort) {}

	async deleteOne(id: string): Promise<User | null> {
		const result = await this.repositoryPort.delete(id);
		return result;
	}

	async deleteAll(): Promise<string | void> {
		const result = await this.repositoryPort.deleteAll();
		return result;
	}
}
