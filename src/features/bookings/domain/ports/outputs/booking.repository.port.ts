import { ApiFeatures } from '../../../../../core/types';
import { Booking, CreateBookingDTO } from '../../entities';

export interface BookingRepositoryPort {
	create(data: CreateBookingDTO): Promise<Booking>;
	getAll(features: ApiFeatures): Promise<Booking[]>;
	getOne(id: string): Promise<Booking | null>;
}
