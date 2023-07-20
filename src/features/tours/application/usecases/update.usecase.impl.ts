import { Tour } from '../../domain/entities/tour.entity';
import { UpdateTourUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class UpdateTourUseCaseImpl implements UpdateTourUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async update(id: string, data: Partial<Omit<Tour, '_id'>>): Promise<Tour | null> {
		const result = await this.repositoryPort.update(id, data);
		return result;
	}
}
