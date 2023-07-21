import { Auth, CreateUserDTO, User } from '../../entities/user.entity';

export interface AuthRepositoryPort {
	signup(data: CreateUserDTO): Promise<Auth>;
	login(data: Pick<User, 'email' | 'password'>): Promise<Auth>;
}
