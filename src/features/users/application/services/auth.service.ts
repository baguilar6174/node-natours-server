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
}
