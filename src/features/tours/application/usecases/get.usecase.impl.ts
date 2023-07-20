import { ApiFeatures } from '../../../../core/types';
import { Tour } from '../../domain/entities/tour.entity';
import { GetToursUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class GetToursUseCaseImpl implements GetToursUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		const result = await this.repositoryPort.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<Tour | null> {
		const result = await this.repositoryPort.getOne(id);
		return result;
	}
}
