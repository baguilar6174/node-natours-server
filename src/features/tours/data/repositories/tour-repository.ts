import { TourRepository } from '../../domain/repositories/tour-repository';
import { Tour, CreateTourDTO, UpdateTourDTO } from '../../domain/entities/tour.entity';
import { TourDataSource } from '../interfaces/data-sources/tour-data-source';
import { PaginationType, SortType } from '../../../../core/types';

export class TourRepositoryImpl implements TourRepository {
	tourDataSource: TourDataSource;

	constructor(tourDataSource: TourDataSource) {
		this.tourDataSource = tourDataSource;
	}

	async seed(): Promise<string | void> {
		const result = await this.tourDataSource.seed();
		return result;
	}

	async delete(id: string): Promise<Tour | null> {
		const result = await this.tourDataSource.deleteOne(id);
		return result;
	}

	async update(id: string, data: UpdateTourDTO): Promise<Tour | null> {
		const result = await this.tourDataSource.updateOne(id, data);
		return result;
	}

	async getOne(id: string): Promise<Tour | null> {
		const result = await this.tourDataSource.getOne(id);
		return result;
	}

	async create(tour: CreateTourDTO): Promise<Tour> {
		const result = await this.tourDataSource.create(tour);
		return result;
	}

	async getAll(query?: object, sort?: SortType, fields?: string, pagination?: PaginationType): Promise<Tour[]> {
		const result = this.tourDataSource.getAll(query, sort, fields, pagination);
		return result;
	}
}
