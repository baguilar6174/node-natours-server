import { ApiFeatures } from '../../../../../core/types';
import { Tour } from '../../entities/tour.entity';

export interface GetAllToursUseCase {
	getAll(features: ApiFeatures): Promise<Tour[]>;
}
