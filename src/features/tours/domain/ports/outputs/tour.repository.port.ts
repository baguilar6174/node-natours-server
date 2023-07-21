import { ApiFeatures } from '../../../../../core/types';
import { CreateTourDTO, Plan, Stat, Tour, UpdateTourDTO } from '../../entities/tour.entity';

export interface TourRepositoryPort {
	seed(): Promise<string | void>;
	create(data: CreateTourDTO): Promise<Tour>;
	delete(id: string): Promise<Tour | null>;
	update(id: string, data: UpdateTourDTO): Promise<Tour | null>;
	getAll(features: ApiFeatures): Promise<Tour[]>;
	getOne(id: string): Promise<Tour | null>;
	getStats(): Promise<Stat[]>;
	getMonthlyPlan(year: number): Promise<Plan[]>;
}
