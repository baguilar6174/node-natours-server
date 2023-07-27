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

	async resetPassword(token: string, password: string): Promise<Auth> {
		const result = await this.authUseCase.resetPassword(token, password);
		return result;
	}

	async updatePassword(id: string, currentPassword: string, password: string, passwordConfirm: string): Promise<Auth> {
		const result = await this.authUseCase.updatePassword(id, currentPassword, password, passwordConfirm);
		return result;
	}

	async updateUserData(
		id: string,
		password: string,
		passwordConfirm: string,
		data: Pick<User, 'email' | 'name'>
	): Promise<User> {
		const result = await this.authUseCase.updateUserData(id, password, passwordConfirm, data);
		return result;
	}

	async deleteAccount(id: string): Promise<User> {
		const result = await this.authUseCase.deleteAccount(id);
		return result;
	}
}
