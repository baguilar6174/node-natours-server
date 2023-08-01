import { Tour } from '../../../tours/domain/entities/tour.entity';
import { User } from '../../../users/domain/entities';

export interface Review {
	_id: string;
	review: string;
	rating: number;
	user: User | string;
	tour: Tour | string;
}
