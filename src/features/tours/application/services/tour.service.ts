import { ApiFeatures } from '../../../../core/types';
import { CreateTourDTO, Tour, Plan, Stat } from '../../domain/entities/tour.entity';
import {
	CreateTourUseCase,
	DeleteTourUseCase,
	GetToursUseCase,
	GetMonthlyPlanToursUseCase,
	GetStatsToursUseCase,
	SeedToursUseCase,
	UpdateTourUseCase
} from '../../domain/ports/inputs';

export class TourService
	implements
		CreateTourUseCase,
		DeleteTourUseCase,
		GetToursUseCase,
		GetMonthlyPlanToursUseCase,
		GetStatsToursUseCase,
		SeedToursUseCase,
		UpdateTourUseCase
{
	constructor(
		private createTourUseCase: CreateTourUseCase,
		private deleteTourUseCase: DeleteTourUseCase,
		private getToursUseCase: GetToursUseCase,
		private getMonthlyPlanToursUseCase: GetMonthlyPlanToursUseCase,
		private getStatsToursUseCase: GetStatsToursUseCase,
		private seedToursUseCase: SeedToursUseCase,
		private updateTourUseCase: UpdateTourUseCase
	) {}

	async create(user: CreateTourDTO): Promise<Tour> {
		const result = await this.createTourUseCase.create(user);
		return result;
	}

	async delete(id: string): Promise<Tour | null> {
		const result = await this.deleteTourUseCase.delete(id);
		return result;
	}

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		const result = await this.getToursUseCase.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<Tour | null> {
		const result = await this.getToursUseCase.getOne(id);
		return result;
	}

	async update(id: string, data: Partial<Omit<Tour, '_id'>>): Promise<Tour | null> {
		const result = await this.updateTourUseCase.update(id, data);
		return result;
	}

	async getMonthlyPlan(year: number): Promise<Plan[]> {
		const result = await this.getMonthlyPlanToursUseCase.getMonthlyPlan(year);
		return result;
	}

	async getStats(): Promise<Stat[]> {
		const result = await this.getStatsToursUseCase.getStats();
		return result;
	}

	async seed(): Promise<string | void> {
		const result = await this.seedToursUseCase.seed();
		return result;
	}
}
