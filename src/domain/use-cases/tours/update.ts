import { TourRepository } from '@domain/interfaces/repositories/tour-repository';
import { UpdateTourUseCase } from '@domain/interfaces/use-cases';
import { TourRequestModel, TourResponseModel } from '@domain/models/tour';

export class UpdateTour implements UpdateTourUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(id: number, data: TourRequestModel): Promise<TourResponseModel> {
		const result = await this.tourRepository.update(id, data);
		return result;
	}
}
