import { Tour } from '../entities/tour.entity';
import { TourRepository } from '../repositories/tour-repository';

export interface DeleteTourUseCase {
	execute(id: string): Promise<Tour | null>;
}

export class DeleteTour implements DeleteTourUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(id: string): Promise<Tour | null> {
		const result = await this.tourRepository.delete(id);
		return result;
	}
}
