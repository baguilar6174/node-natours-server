import { User } from '../../entities/user.entity';

export interface GetOneUserUseCase {
	getOne(id: string): Promise<User | null>;
}
