import {
	Auth,
	ForgotPasswordDTO,
	ResetPasswordDTO,
	SignInDTO,
	SignUpDTO,
	UpdatePasswordDTO,
	UpdateUserDataDTO,
	User
} from '../../domain/entities';
import { AuthUseCase } from '../../domain/ports/inputs';

export class AuthService implements AuthUseCase {
	constructor(private authUseCase: AuthUseCase) {}

	async signup(data: SignUpDTO): Promise<Auth> {
		const result = await this.authUseCase.signup(data);
		return result;
	}

	async login(data: SignInDTO): Promise<Auth> {
		const result = await this.authUseCase.login(data);
		return result;
	}

	async forgotPassword(data: ForgotPasswordDTO): Promise<string> {
		const result = await this.authUseCase.forgotPassword(data);
		return result;
	}

	async resetPassword(data: ResetPasswordDTO): Promise<Auth> {
		const result = await this.authUseCase.resetPassword(data);
		return result;
	}

	async updatePassword(data: UpdatePasswordDTO): Promise<Auth> {
		const result = await this.authUseCase.updatePassword(data);
		return result;
	}

	async updateUserData(data: UpdateUserDataDTO): Promise<User> {
		const result = await this.authUseCase.updateUserData(data);
		return result;
	}

	async deleteAccount(id: Pick<User, '_id'>): Promise<User> {
		const result = await this.authUseCase.deleteAccount(id);
		return result;
	}
}
