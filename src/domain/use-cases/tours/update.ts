import { TourRepository } from '../../interfaces/repositories/tour-repository';
import { UpdateTourUseCase } from '../../interfaces/use-cases';
import { TourRequestModel, TourResponseModel } from '../../models/tour';

export class UpdateTour implements UpdateTourUseCase {
	tourRepository: TourRepository;

	constructor(contactRepository: TourRepository) {
		this.tourRepository = contactRepository;
	}

	async execute(id: number, data: TourRequestModel): Promise<TourResponseModel> {
		const result = await this.tourRepository.update(id, data);
		return result;
	}
}
