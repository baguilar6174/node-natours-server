import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { AuthUseCase } from '../../domain/ports/inputs';
import { AuthRepositoryPort } from '../../domain/ports/outputs';

export class AuthUseCaseImpl implements AuthUseCase {
	constructor(private repositoryPort: AuthRepositoryPort) {}

	async signup(data: CreateUserDTO): Promise<User> {
		const result = await this.repositoryPort.signup(data);
		return result;
	}
}
