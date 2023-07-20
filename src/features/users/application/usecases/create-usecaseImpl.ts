import { CreateUserDTO, User } from '../../domain/models/user.model';
import { CreateUserUseCase } from '../../domain/ports/inputs/create-usecase';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repositoryPort';

export class CreateUserUseCaseImpl implements CreateUserUseCase {
	constructor(public repositoryPort: UserRepositoryPort) {}

	async create(user: CreateUserDTO): Promise<User> {
		const result = await this.repositoryPort.create(user);
		return result;
	}
}
