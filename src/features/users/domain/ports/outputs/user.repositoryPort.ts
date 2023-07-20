import { ApiFeatures } from '../../../../../core/types';
import { CreateUserDTO, UpdateUserDTO, User } from '../../models/user.model';

export interface UserRepositoryPort {
	create(user: CreateUserDTO): Promise<User>;
	delete(id: string): Promise<User | null>;
	update(id: string, data: UpdateUserDTO): Promise<User | null>;
	getAll(features: ApiFeatures): Promise<User[]>;
	getOne(id: string): Promise<User | null>;
}
