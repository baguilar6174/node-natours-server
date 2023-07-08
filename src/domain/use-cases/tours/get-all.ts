import { TourRepository } from '../../interfaces/repositories/tour-repository';
import { GetAllToursUseCase } from '../../interfaces/use-cases';
import { TourResponseModel } from '../../models/tour';

export class GetAllTours implements GetAllToursUseCase {
	tourRepository: TourRepository;

	constructor(contactRepository: TourRepository) {
		this.tourRepository = contactRepository;
	}

	async execute(): Promise<TourResponseModel[]> {
		const result = await this.tourRepository.getAll();
		return result;
	}
}
