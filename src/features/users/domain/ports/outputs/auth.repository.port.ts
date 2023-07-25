import { Auth, CreateUserDTO, User } from '../../entities/user.entity';

export interface AuthRepositoryPort {
	signup(data: CreateUserDTO): Promise<Auth>;
	login(data: Pick<User, 'email' | 'password'>): Promise<Auth>;
	forgotPassword(data: Pick<User, 'email'>, resetURL: string): Promise<string>;
	resetPassword(token: string, password: string): Promise<Auth>;
}
