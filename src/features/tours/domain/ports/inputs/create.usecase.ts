import { CreateTourDTO, Tour } from '../../entities/tour.entity';

export interface CreateTourUseCase {
	create(data: CreateTourDTO): Promise<Tour>;
}
