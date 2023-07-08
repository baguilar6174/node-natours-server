import { TourRepository } from '../../interfaces/repositories/tour-repository';
import { DeleteTourUseCase } from '../../interfaces/use-cases';

export class DeleteTour implements DeleteTourUseCase {
	tourRepository: TourRepository;

	constructor(contactRepository: TourRepository) {
		this.tourRepository = contactRepository;
	}

	async execute(id: number): Promise<number> {
		const result = await this.tourRepository.delete(id);
		return result;
	}
}
