import { UpdateUserDTO, User } from '../../models/user.model';

export interface UpdateUserUseCase {
	update(id: string, data: UpdateUserDTO): Promise<User | null>;
}
