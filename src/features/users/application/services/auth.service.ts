import { Auth, CreateUserDTO, User } from '../../domain/entities/user.entity';
import { AuthUseCase } from '../../domain/ports/inputs';

export class AuthService implements AuthUseCase {
	constructor(private authUseCase: AuthUseCase) {}

	async signup(data: CreateUserDTO): Promise<Auth> {
		const result = await this.authUseCase.signup(data);
		return result;
	}

	async login(data: Pick<User, 'email' | 'password'>): Promise<Auth> {
		const result = await this.authUseCase.login(data);
		return result;
	}

	async forgotPassword(data: Pick<User, 'email'>, resetURL: string): Promise<string> {
		const result = await this.authUseCase.forgotPassword(data, resetURL);
		return result;
	}

	async resetPassword(): Promise<any> {
		const result = await this.authUseCase.resetPassword();
		return result;
	}
}
