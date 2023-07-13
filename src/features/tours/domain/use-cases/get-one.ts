import { TourRepository } from '../repositories/tour-repository';
import { Tour } from '../entities/tour.entity';

export class GetOneTours {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(id: string): Promise<Tour | null> {
		const result = await this.tourRepository.getOne(id);
		return result;
	}
}
