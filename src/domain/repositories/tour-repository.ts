import { TourDataSource } from '../../data/interfaces/data-sources/tour-data-source';
import { TourRepository } from '../interfaces/repositories/tour-repository';
import { TourRequestModel, TourResponseModel } from '../models/tour';

export class TourRepositoryImpl implements TourRepository {
	tourDataSource: TourDataSource;

	constructor(tourDataSource: TourDataSource) {
		this.tourDataSource = tourDataSource;
	}

	async delete(id: string) {
		const result = await this.tourDataSource.deleteOne(id);
		return result;
	}

	async update(id: string, data: TourRequestModel) {
		const result = await this.tourDataSource.updateOne(id, data);
		return result;
	}

	async getOne(id: string): Promise<TourResponseModel | null> {
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
