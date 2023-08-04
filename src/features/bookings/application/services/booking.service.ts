import { ApiFeatures } from '../../../../core/types';
import { Booking, CreateBookingDTO, CreateBookingUseCase, GetBookingsUseCase } from '../../domain';

export class BookingService implements CreateBookingUseCase, GetBookingsUseCase {
	constructor(
		private createBookingUseCase: CreateBookingUseCase,
		private getBookingsUseCase: GetBookingsUseCase
	) {}

	async create(data: CreateBookingDTO): Promise<Booking> {
		const result = await this.createBookingUseCase.create(data);
		return result;
	}

	async getAll(features: ApiFeatures): Promise<Booking[]> {
		const result = await this.getBookingsUseCase.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<Booking | null> {
		const result = await this.getBookingsUseCase.getOne(id);
		return result;
	}
}
