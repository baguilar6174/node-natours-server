import { ApiFeatures } from '../../../../../core/types';
import { Tour } from '../../entities/tour.entity';

export interface GetToursUseCase {
	getAll(features: ApiFeatures): Promise<Tour[]>;
	getOne(id: string): Promise<Tour | null>;
}
