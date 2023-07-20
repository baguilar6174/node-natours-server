import { Tour } from '../../domain/entities/tour.entity';
import { DeleteTourUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class DeleteTourUseCaseImpl implements DeleteTourUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async delete(id: string): Promise<Tour | null> {
		const result = await this.repositoryPort.delete(id);
		return result;
	}
}
