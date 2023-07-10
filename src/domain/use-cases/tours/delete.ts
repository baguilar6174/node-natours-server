import { TourRepository } from '../../interfaces/repositories/tour-repository';
import { DeleteTourUseCase } from '../../interfaces/use-cases';

export class DeleteTour implements DeleteTourUseCase {
	tourRepository: TourRepository;

	constructor(tourRepository: TourRepository) {
		this.tourRepository = tourRepository;
	}

	async execute(id: number): Promise<number> {
		const result = await this.tourRepository.delete(id);
		return result;
	}
}
