import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { AuthUseCase } from '../../domain/ports/inputs';

export class AuthService implements AuthUseCase {
	constructor(private authUseCase: AuthUseCase) {}

	async signup(data: CreateUserDTO): Promise<User> {
		const result = await this.authUseCase.signup(data);
		return result;
	}
}
