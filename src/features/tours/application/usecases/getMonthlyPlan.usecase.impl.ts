import { Plan } from '../../domain/entities/tour.entity';
import { GetMonthlyPlanToursUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class GetMonthlyPlanToursUseCaseImpl implements GetMonthlyPlanToursUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async getMonthlyPlan(year: number): Promise<Plan[]> {
		const result = await this.repositoryPort.getMonthlyPlan(year);
		return result;
	}
}
