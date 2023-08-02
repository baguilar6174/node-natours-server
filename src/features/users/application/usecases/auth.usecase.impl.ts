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
import { AuthRepositoryPort } from '../../domain/ports/outputs';

export class AuthUseCaseImpl implements AuthUseCase {
	constructor(private repositoryPort: AuthRepositoryPort) {}

	async signup(data: SignUpDTO): Promise<Auth> {
		const result = await this.repositoryPort.signup(data);
		return result;
	}

	async login(data: SignInDTO): Promise<Auth> {
		const result = await this.repositoryPort.login(data);
		return result;
	}

	async userInfo(id: Pick<User, '_id'>): Promise<User> {
		const result = await this.repositoryPort.userInfo(id);
		return result;
	}

	async forgotPassword(data: ForgotPasswordDTO): Promise<string> {
		const result = await this.repositoryPort.forgotPassword(data);
		return result;
	}

	async resetPassword(data: ResetPasswordDTO): Promise<Auth> {
		const result = await this.repositoryPort.resetPassword(data);
		return result;
	}

	async updatePassword(data: UpdatePasswordDTO): Promise<Auth> {
		const result = await this.repositoryPort.updatePassword(data);
		return result;
	}

	async updateUserData(data: UpdateUserDataDTO): Promise<User> {
		const result = await this.repositoryPort.updateUserData(data);
		return result;
	}

	async deleteAccount(id: Pick<User, '_id'>): Promise<User> {
		const result = await this.repositoryPort.deleteAccount(id);
		return result;
	}
}
