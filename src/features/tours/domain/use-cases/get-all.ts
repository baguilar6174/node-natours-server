import { TourRepository } from '../repositories/tour-repository';
import { Tour } from '../entities/tour.entity';

export class GetAllTours {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(): Promise<Tour[]> {
		const result = await this.tourRepository.getAll();
		return result;
	}
}
