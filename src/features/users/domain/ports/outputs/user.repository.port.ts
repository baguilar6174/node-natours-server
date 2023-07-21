import { ApiFeatures } from '../../../../../core/types';
import { CreateUserDTO, UpdateUserDTO, User } from '../../entities/user.entity';

export interface UserRepositoryPort {
	create(data: CreateUserDTO): Promise<User>;
	delete(id: string): Promise<User | null>;
	update(id: string, data: UpdateUserDTO): Promise<User | null>;
	getAll(features: ApiFeatures): Promise<User[]>;
	getOne(id: string): Promise<User | null>;
}
