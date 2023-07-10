import { TourRepository } from '../../interfaces/repositories/tour-repository';
import { GetOneToursUseCase } from '../../interfaces/use-cases';
import { TourResponseModel } from '../../models/tour';

export class GetOneTours implements GetOneToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(id: number): Promise<TourResponseModel | undefined> {
		const result = await this.tourRepository.getOne(id);
		return result;
	}
}
