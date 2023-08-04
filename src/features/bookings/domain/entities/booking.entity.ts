import { Tour } from '../../../tours';
import { User } from '../../../users/domain/entities';

export interface Booking {
	_id: string;
	user: string | User;
	tour: string | Tour;
	price: number;
	paid?: boolean;
}

export type CreateBookingDTO = Omit<Booking, '_id'>;
export type UpdateBookingDTO = Partial<Omit<Booking, '_id'>>;
