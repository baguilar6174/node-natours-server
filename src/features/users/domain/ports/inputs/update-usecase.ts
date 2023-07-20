import { UpdateUserDTO, User } from '../../entities/user.entity';

export interface UpdateUserUseCase {
	update(id: string, data: UpdateUserDTO): Promise<User | null>;
}
