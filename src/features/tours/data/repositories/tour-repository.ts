import { TourRepository } from '../../domain/repositories/tour-repository';
import { Tour, CreateTourDTO, UpdateTourDTO, Stat, Plan } from '../../domain/entities/tour.entity';
import { DataSource } from '../interfaces';
import { ApiFeatures } from '../../../../core/types';

export class TourRepositoryImpl implements TourRepository {
	dataSource: DataSource;

	constructor(dataSource: DataSource) {
		this.dataSource = dataSource;
	}

	async seed(): Promise<string | void> {
		const result = await this.dataSource.seed();
		return result;
	}

	async delete(id: string): Promise<Tour | null> {
		const result = await this.dataSource.deleteOne(id);
		return result;
	}

	async update(id: string, data: UpdateTourDTO): Promise<Tour | null> {
		const result = await this.dataSource.updateOne(id, data);
		return result;
	}

	async getOne(id: string): Promise<Tour | null> {
		const result = await this.dataSource.getOne(id);
		return result;
	}

	async create(tour: CreateTourDTO): Promise<Tour> {
		const result = await this.dataSource.create(tour);
		return result;
	}

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		const result = this.dataSource.getAll(features);
		return result;
	}

	async getStats(): Promise<Stat[]> {
		const result = this.dataSource.getStats();
		return result;
	}

	async getMonthlyPlan(year: number): Promise<Plan[]> {
		const result = this.dataSource.getMonthlyPlan(year);
		return result;
	}
}
