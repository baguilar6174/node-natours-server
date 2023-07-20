import { ApiFeatures } from '../../../../core/types';
import { Tour } from '../../domain/entities/tour.entity';
import { GetAllToursUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class GetAllToursUseCaseImpl implements GetAllToursUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async getAll(features: ApiFeatures): Promise<Tour[]> {
		const result = await this.repositoryPort.getAll(features);
		return result;
	}
}
