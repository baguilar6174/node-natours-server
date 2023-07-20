import { CreateUserDTO, User } from '../../entities/user.entity';

export interface CreateUserUseCase {
	create(user: CreateUserDTO): Promise<User>;
}
