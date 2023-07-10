import { TourRepository } from '../../interfaces/repositories/tour-repository';
import { CreateTourUseCase } from '../../interfaces/use-cases';
import { TourRequestModel, TourResponseModel } from '../../models/tour';

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
