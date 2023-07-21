import { CreateUserDTO, User } from '../../entities/user.entity';

export interface AuthRepositoryPort {
	signup(data: CreateUserDTO): Promise<User>;
}
