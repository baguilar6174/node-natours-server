import { ApiFeatures } from '../../../../../core/types';
import { User } from '../../entities/user.entity';

export interface GetAllUsersUseCase {
	getAll(features: ApiFeatures): Promise<User[]>;
}
