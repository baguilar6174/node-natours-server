import { TourRepository } from '../repositories/tour-repository';
import { Tour } from '../entities/tour.entity';
import { PaginationType, SortType } from '../../../../core/types';

export interface GetAllToursUseCase {
	execute(query?: object, sort?: string | SortType, fields?: string, pagination?: PaginationType): Promise<Tour[]>;
}

export class GetAllTours implements GetAllToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(
		query?: object,
		sort?: string | SortType,
		fields?: string,
		pagination?: PaginationType
	): Promise<Tour[]> {
		const result = await this.tourRepository.getAll(query, sort, fields, pagination);
		return result;
	}
}
