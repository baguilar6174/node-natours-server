import { TourRepository } from '@domain/interfaces/repositories/tour-repository';
import { GetAllToursUseCase } from '@domain/interfaces/use-cases';
import { TourResponseModel } from '@domain/models/tour';

export class GetAllTours implements GetAllToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(): Promise<TourResponseModel[]> {
		const result = await this.tourRepository.getAll();
		return result;
	}
}
