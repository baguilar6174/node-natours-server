import { ApiFeatures } from '../../../../core/types';
import { Booking, BookingRepositoryPort, GetBookingsUseCase } from '../../domain';

export class GetBookingsUseCaseImpl implements GetBookingsUseCase {
	constructor(private repositoryPort: BookingRepositoryPort) {}

	async getAll(features: ApiFeatures): Promise<Booking[]> {
		const result = await this.repositoryPort.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<Booking | null> {
		const result = await this.repositoryPort.getOne(id);
		return result;
	}
}
