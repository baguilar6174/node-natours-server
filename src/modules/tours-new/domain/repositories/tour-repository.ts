import { TourDataSource } from '../../data/interfaces/data-sources/tour-data-source';
import { TourRepository } from '../interfaces/repositories/tour-repository';
import { TourRequestModel, TourResponseModel } from '../models/tour';

export class TourRepositoryImpl implements TourRepository {
	tourDataSource: TourDataSource;

	constructor(tourDataSource: TourDataSource) {
		this.tourDataSource = tourDataSource;
	}

	async delete(id: string) {
		this.tourDataSource.deleteOne(id);
	}

	async update(id: string, data: TourRequestModel) {
		this.tourDataSource.updateOne(id, data);
	}

	async getOne(id: string): Promise<TourResponseModel | undefined> {
		const result = await this.tourDataSource.getOne(id);
		return result;
	}

	async create(tour: TourRequestModel) {
		return this.tourDataSource.create(tour);
	}

	async getAll(): Promise<TourResponseModel[]> {
		const result = this.tourDataSource.getAll();
		return result;
	}
}
