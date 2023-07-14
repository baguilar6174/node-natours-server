import { TourRepository } from '../repositories/tour-repository';

export interface SeedToursUseCase {
	execute(): Promise<string | void>;
}

export class SeedTours implements SeedToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(): Promise<string | void> {
		const result = await this.tourRepository.seed();
		return result;
	}
}
