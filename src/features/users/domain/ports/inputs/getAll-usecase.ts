import { ApiFeatures } from '../../../../../core/types';
import { User } from '../../models/user.model';

export interface GetAllUsersUseCase {
	getAll(features: ApiFeatures): Promise<User[]>;
}
