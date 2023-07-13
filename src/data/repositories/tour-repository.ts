import { TourRepository } from '../../domain/repositories/tour-repository';
import { Tour, CreateTourDTO, UpdateTourDTO } from '../../domain/entities/tour.entity';
import { TourDataSource } from '../interfaces/data-sources/tour-data-source';

export class TourRepositoryImpl implements TourRepository {
	tourDataSource: TourDataSource;

	constructor(tourDataSource: TourDataSource) {
		this.tourDataSource = tourDataSource;
	}

	async delete(id: string) {
		const result = await this.tourDataSource.deleteOne(id);
		return result;
	}

	async update(id: string, data: UpdateTourDTO) {
		const result = await this.tourDataSource.updateOne(id, data);
		return result;
	}

	async getOne(id: string): Promise<Tour | null> {
		const result = await this.tourDataSource.getOne(id);
		return result;
	}

	async create(tour: CreateTourDTO) {
		const result = await this.tourDataSource.create(tour);
		return result;
	}

	async getAll(): Promise<Tour[]> {
		const result = this.tourDataSource.getAll();
		return result;
	}
}
