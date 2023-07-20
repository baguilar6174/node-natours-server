import { Tour } from '../../domain/entities/tour.entity';
import { GetOneTourUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class GetOneTourUseCaseImpl implements GetOneTourUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async getOne(id: string): Promise<Tour | null> {
		const result = await this.repositoryPort.getOne(id);
		return result;
	}
}
