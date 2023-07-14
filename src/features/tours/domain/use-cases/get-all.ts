import { TourRepository } from '../repositories/tour-repository';
import { Tour } from '../entities/tour.entity';

export interface GetAllToursUseCase {
	execute(): Promise<Tour[]>;
}

export class GetAllTours implements GetAllToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(): Promise<Tour[]> {
		const result = await this.tourRepository.getAll();
		return result;
	}
}
