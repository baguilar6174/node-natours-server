import { User } from '../../domain/entities/user.entity';
import { UpdateUserUseCase } from '../../domain/ports/inputs/update-usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
	constructor(public repositoryPort: UserRepositoryPort) {}

	async update(id: string, data: Partial<Omit<User, '_id'>>): Promise<User | null> {
		const result = await this.repositoryPort.update(id, data);
		return result;
	}
}
