import { Auth, CreateUserDTO, User } from '../../domain/entities/user.entity';
import { AuthUseCase } from '../../domain/ports/inputs';
import { AuthRepositoryPort } from '../../domain/ports/outputs';

export class AuthUseCaseImpl implements AuthUseCase {
	constructor(private repositoryPort: AuthRepositoryPort) {}

	async signup(data: CreateUserDTO): Promise<Auth> {
		const result = await this.repositoryPort.signup(data);
		return result;
	}

	async login(data: Pick<User, 'email' | 'password'>): Promise<Auth> {
		const result = await this.repositoryPort.login(data);
		return result;
	}

	async forgotPassword(data: Pick<User, 'email'>, resetURL: string): Promise<string> {
		const result = await this.repositoryPort.forgotPassword(data, resetURL);
		return result;
	}

	async resetPassword(): Promise<any> {
		const result = await this.repositoryPort.resetPassword();
		return result;
	}
}
