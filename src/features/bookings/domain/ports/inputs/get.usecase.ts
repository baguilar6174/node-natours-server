import { ApiFeatures } from '../../../../../core/types';
import { Booking } from '../../entities';

export interface GetBookingsUseCase {
	getAll(features: ApiFeatures): Promise<Booking[]>;
	getOne(id: string): Promise<Booking | null>;
}
