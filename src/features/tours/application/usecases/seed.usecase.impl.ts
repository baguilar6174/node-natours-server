import { SeedToursUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class SeedToursUseCaseImpl implements SeedToursUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async seed(): Promise<string | void> {
		const result = await this.repositoryPort.seed();
		return result;
	}
}
