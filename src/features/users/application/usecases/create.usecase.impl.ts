import { CreateUserDTO, User } from '../../domain/entities';
import { CreateUserUseCase } from '../../domain/ports/inputs/create.usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';

export class CreateUserUseCaseImpl implements CreateUserUseCase {
	constructor(private repositoryPort: UserRepositoryPort) {}

	async create(data: CreateUserDTO): Promise<User> {
		const result = await this.repositoryPort.create(data);
		return result;
	}
}
