import { CloseTourParameters, Distance, GetDistancesUseCase, TourRepositoryPort } from '../../domain';

export class GetDistancesUseCaseImpl implements GetDistancesUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async getDistances(params: Omit<CloseTourParameters, 'distance'>): Promise<Distance[]> {
		const result = await this.repositoryPort.getDistances(params);
		return result;
	}
}
