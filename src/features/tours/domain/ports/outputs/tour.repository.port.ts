import { ApiFeatures } from '../../../../../core/types';
import { CloseTourParameters, CreateTourDTO, Distance, Plan, Stat, Tour, UpdateTourDTO } from '../../entities';

export interface TourRepositoryPort {
	seed(): Promise<string | void>;
	create(data: CreateTourDTO): Promise<Tour>;
	delete(id: string): Promise<Tour | null>;
	update(id: string, data: UpdateTourDTO): Promise<Tour | null>;
	getAll(features: ApiFeatures): Promise<Tour[]>;
	getOne(id: string): Promise<Tour | null>;
	getCloserTours(params: CloseTourParameters): Promise<Tour[]>;
	getStats(): Promise<Stat[]>;
	getMonthlyPlan(year: number): Promise<Plan[]>;
	getDistances(params: Omit<CloseTourParameters, 'distance'>): Promise<Distance[]>;
}
