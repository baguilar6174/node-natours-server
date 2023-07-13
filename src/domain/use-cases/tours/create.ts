import { TourRepository } from '../../repositories/tour-repository';
import { CreateTourDTO, Tour } from '../../entities/tour.entity';

export class CreateTours {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(tour: CreateTourDTO): Promise<Tour> {
		const result = await this.tourRepository.create(tour);
		return result;
	}
}
