import { TourRepository } from '../repositories/tour-repository';
import { CreateTourDTO, Tour } from '../entities/tour.entity';

export interface CreateTourUseCase {
	execute(tour: CreateTourDTO): Promise<Tour>;
}

export class CreateTour implements CreateTourUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(tour: CreateTourDTO): Promise<Tour> {
		const result = await this.tourRepository.create(tour);
		return result;
	}
}
