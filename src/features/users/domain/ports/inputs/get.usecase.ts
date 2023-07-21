import { ApiFeatures } from '../../../../../core/types';
import { User } from '../../entities/user.entity';

export interface GetUsersUseCase {
	getAll(features: ApiFeatures): Promise<User[]>;
	getOne(id: string): Promise<User | null>;
}
