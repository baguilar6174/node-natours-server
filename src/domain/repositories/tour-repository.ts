import { TourDataSource } from '../../data/interfaces/data-sources/tour-data-source';
import { TourRepository } from '../interfaces/repositories/tour-repository';
import { TourRequestModel, TourResponseModel } from '../models/tour';

export class TourRepositoryImpl implements TourRepository {
	tourDataSource: TourDataSource;

	constructor(tourDataSource: TourDataSource) {
		this.tourDataSource = tourDataSource;
	}

	async delete(id: number) {
		const result = await this.tourDataSource.delete(id);
		return result;
	}

	async update(id: number, data: TourRequestModel) {
		const result = await this.tourDataSource.update(id, data);
		return result;
	}

	async getOne(id: number): Promise<TourResponseModel | undefined> {
		const result = await this.tourDataSource.getOne(id);
		return result;
	}

	async create(tour: TourRequestModel) {
		const result = await this.tourDataSource.create(tour);
		return result;
	}

	async getAll(): Promise<TourResponseModel[]> {
		const result = this.tourDataSource.getAll();
		return result;
	}
}
