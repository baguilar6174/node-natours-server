import { TourRepository } from '../repositories/tour-repository';

export class SeedTours {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(): Promise<string | void> {
		const result = await this.tourRepository.seed();
		return result;
	}
}
