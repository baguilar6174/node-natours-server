import { TourRepository } from '../../interfaces/repositories/tour-repository';
import { UpdateTourUseCase } from '../../interfaces/use-cases';
import { TourRequestModel, TourResponseModel } from '../../models/tour';

export class UpdateTour implements UpdateTourUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(id: string, data: TourRequestModel): Promise<TourResponseModel | null> {
		const result = await this.tourRepository.update(id, data);
		return result;
	}
}
