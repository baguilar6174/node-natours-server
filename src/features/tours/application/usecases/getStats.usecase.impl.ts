import { Stat } from '../../domain/entities/tour.entity';
import { GetStatsToursUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class GetStatsToursUseCaseImpl implements GetStatsToursUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async getStats(): Promise<Stat[]> {
		const result = await this.repositoryPort.getStats();
		return result;
	}
}
