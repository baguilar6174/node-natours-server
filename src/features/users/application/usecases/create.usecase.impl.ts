import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../domain/ports/inputs/create.usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';

export class CreateUserUseCaseImpl implements CreateUserUseCase {
	constructor(public repositoryPort: UserRepositoryPort) {}

	async create(user: CreateUserDTO): Promise<User> {
		const result = await this.repositoryPort.create(user);
		return result;
	}
}
