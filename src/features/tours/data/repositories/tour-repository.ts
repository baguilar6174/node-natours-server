import { TourRepository } from '../../domain/repositories/tour-repository';
import { Tour, CreateTourDTO, UpdateTourDTO, Stat, Plan } from '../../domain/entities/tour.entity';
import { TourDataSource } from '../interfaces/data-sources/tour-data-source';
import { ApiFeatures } from '../../../../core/types';

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

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		const result = this.tourDataSource.getAll(features);
		return result;
	}

	async getStats(): Promise<Stat[]> {
		const result = this.tourDataSource.getStats();
		return result;
	}

	async getMonthlyPlan(year: number): Promise<Plan[]> {
		const result = this.tourDataSource.getMonthlyPlan(year);
		return result;
	}
}
