import { Booking, CreateBookingDTO } from '../../entities';

export interface CreateBookingUseCase {
	create(data: CreateBookingDTO): Promise<Booking>;
}
