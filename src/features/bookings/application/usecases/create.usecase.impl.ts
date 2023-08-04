import { Booking, BookingRepositoryPort, CreateBookingDTO, CreateBookingUseCase } from '../../domain';

export class CreateBookingUseCaseImpl implements CreateBookingUseCase {
	constructor(private repositoryPort: BookingRepositoryPort) {}

	async create(data: CreateBookingDTO): Promise<Booking> {
		const result = await this.repositoryPort.create(data);
		return result;
	}
}
