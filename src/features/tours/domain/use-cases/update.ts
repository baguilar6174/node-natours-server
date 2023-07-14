import { TourRepository } from '../repositories/tour-repository';
import { Tour, UpdateTourDTO } from '../entities/tour.entity';

export interface UpdateTourUseCase {
	execute(id: string, data: UpdateTourDTO): Promise<Tour | null>;
}

export class UpdateTour implements UpdateTourUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(id: string, data: UpdateTourDTO): Promise<Tour | null> {
		const result = await this.tourRepository.update(id, data);
		return result;
	}
}
