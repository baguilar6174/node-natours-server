import { Tour } from '../../entities/tour.entity';

export interface GetOneTourUseCase {
	getOne(id: string): Promise<Tour | null>;
}
