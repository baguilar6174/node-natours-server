import { User } from '../../models/user.model';

export interface DeleteUserUseCase {
	deleteOne(id: string): Promise<User | null>;
}
