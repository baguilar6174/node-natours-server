import { User } from '../../entities/user.entity';

export interface DeleteUserUseCase {
	deleteOne(id: string): Promise<User | null>;
	deleteAll(): Promise<string | void>;
}
