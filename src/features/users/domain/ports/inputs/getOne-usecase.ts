import { User } from '../../models/user.model';

export interface GetOneUserUseCase {
	getOne(id: string): Promise<User | null>;
}
