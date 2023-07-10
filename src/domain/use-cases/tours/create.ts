import { TourRepository } from '@domain/interfaces/repositories/tour-repository';
import { CreateTourUseCase } from '@domain/interfaces/use-cases';
import { TourRequestModel, TourResponseModel } from '@domain/models/tour';

export class CreateTours implements CreateTourUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(tour: TourRequestModel): Promise<TourResponseModel> {
		const result = await this.tourRepository.create(tour);
		return result;
	}
}
