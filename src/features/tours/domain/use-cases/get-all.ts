import { TourRepository } from '../repositories/tour-repository';
import { Tour } from '../entities/tour.entity';
import { SortType } from '../../../../core/types';

export interface GetAllToursUseCase {
	execute(query?: object, sort?: string | SortType): Promise<Tour[]>;
}

export class GetAllTours implements GetAllToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(query?: object, sort?: string | SortType): Promise<Tour[]> {
		const result = await this.tourRepository.getAll(query, sort);
		return result;
	}
}
