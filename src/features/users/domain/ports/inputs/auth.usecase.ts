import { CreateUserDTO, User } from '../../entities/user.entity';

export interface AuthUseCase {
	signup(user: CreateUserDTO): Promise<User>;
}
