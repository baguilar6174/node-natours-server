import { Plan } from '../../entities/tour.entity';

export interface GetMonthlyPlanToursUseCase {
	getMonthlyPlan(year: number): Promise<Plan[]>;
}
