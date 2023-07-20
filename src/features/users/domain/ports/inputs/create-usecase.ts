import { CreateUserDTO, User } from '../../models/user.model';

export interface CreateUserUseCase {
	create(user: CreateUserDTO): Promise<User>;
}
