import { TourRepository } from '../repositories/tour-repository';
import { Stat } from '../entities/tour.entity';

export interface GetStatsToursUseCase {
	execute(): Promise<Stat[]>;
}

export class GetStatsTours implements GetStatsToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(): Promise<Stat[]> {
		const result = await this.tourRepository.getStats();
		return result;
	}
}
