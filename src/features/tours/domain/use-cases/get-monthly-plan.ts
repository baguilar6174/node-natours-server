import { TourRepository } from '../repositories/tour-repository';
import { Plan } from '../entities/tour.entity';

export interface GetMonthlyPlanToursUseCase {
	execute(year: number): Promise<Plan[]>;
}

export class GetMonthlyPlanTours implements GetMonthlyPlanToursUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(year: number): Promise<Plan[]> {
		const result = await this.tourRepository.getMonthlyPlan(year);
		return result;
	}
}
