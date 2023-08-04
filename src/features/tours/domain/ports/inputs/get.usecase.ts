import { ApiFeatures } from '../../../../../core/types';
import { CloseTourParameters, Tour } from '../../entities';

export interface GetToursUseCase {
	getAll(features: ApiFeatures): Promise<Tour[]>;
	getOne(id: string): Promise<Tour | null>;
	getCloserTours(params: CloseTourParameters): Promise<Tour[]>;
}
