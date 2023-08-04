import { ApiFeatures } from '../../../../core/types';
import {
	CreateTourDTO,
	Tour,
	Plan,
	Stat,
	UpdateTourDTO,
	CloseTourParameters,
	Distance
} from '../../domain/entities/tour.entity';
import {
	CreateTourUseCase,
	DeleteTourUseCase,
	GetToursUseCase,
	GetMonthlyPlanToursUseCase,
	GetStatsToursUseCase,
	SeedToursUseCase,
	UpdateTourUseCase,
	GetDistancesUseCase
} from '../../domain/ports/inputs';

export class TourService
	implements
		CreateTourUseCase,
		DeleteTourUseCase,
		GetToursUseCase,
		GetMonthlyPlanToursUseCase,
		GetStatsToursUseCase,
		SeedToursUseCase,
		UpdateTourUseCase,
		GetDistancesUseCase
{
	constructor(
		private createTourUseCase: CreateTourUseCase,
		private deleteTourUseCase: DeleteTourUseCase,
		private getToursUseCase: GetToursUseCase,
		private getMonthlyPlanToursUseCase: GetMonthlyPlanToursUseCase,
		private getStatsToursUseCase: GetStatsToursUseCase,
		private seedToursUseCase: SeedToursUseCase,
		private updateTourUseCase: UpdateTourUseCase,
		private getDistancesUseCase: GetDistancesUseCase
	) {}

	async create(data: CreateTourDTO): Promise<Tour> {
		const result = await this.createTourUseCase.create(data);
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

	async getCloserTours(params: CloseTourParameters): Promise<Tour[]> {
		const result = await this.getToursUseCase.getCloserTours(params);
		return result;
	}

	async update(id: string, data: UpdateTourDTO): Promise<Tour | null> {
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

	async getDistances(params: Omit<CloseTourParameters, 'distance'>): Promise<Distance[]> {
		const result = await this.getDistancesUseCase.getDistances(params);
		return result;
	}
}
