import { Tour } from '../entities/tour.entity';
import { TourRepository } from '../repositories/tour-repository';
export class DeleteTour {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(id: string): Promise<Tour | null> {
		const result = await this.tourRepository.delete(id);
		return result;
	}
}
