import { Tour, UpdateTourDTO } from '../../entities/tour.entity';

export interface UpdateTourUseCase {
	update(id: string, data: UpdateTourDTO): Promise<Tour | null>;
}
