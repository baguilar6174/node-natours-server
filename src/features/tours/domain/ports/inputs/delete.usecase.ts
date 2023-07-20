import { Tour } from '../../entities/tour.entity';

export interface DeleteTourUseCase {
	delete(id: string): Promise<Tour | null>;
}
