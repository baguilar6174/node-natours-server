import { ApiFeatures } from '../../../../../core/types';
import { CreateUserDTO, UpdateUserDTO, User } from '../../entities/user.entity';

export interface UserUseCase {
	create(user: CreateUserDTO): Promise<User>;
	deleteOne(id: string): Promise<User | null>;
	getAll(features: ApiFeatures): Promise<User[]>;
	getOne(id: string): Promise<User | null>;
	update(id: string, data: UpdateUserDTO): Promise<User | null>;
}
