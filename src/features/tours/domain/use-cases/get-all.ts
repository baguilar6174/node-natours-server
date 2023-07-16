import { TourRepository } from '../repositories/tour-repository';
import { Tour } from '../entities/tour.entity';
import { ApiFeatures } from '../../../../core/types';

export interface GetAllToursUseCase {
	execute(features: ApiFeatures): Promise<Tour[]>;
}

export class GetAllTours implements GetAllToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(features: ApiFeatures): Promise<Tour[]> {
		const result = await this.tourRepository.getAll(features);
		return result;
	}
}
