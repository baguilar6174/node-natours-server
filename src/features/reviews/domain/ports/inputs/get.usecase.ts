import { ApiFeatures } from '../../../../../core/types';
import { Review } from '../../entities/review.entity';

export interface GetReviewsUseCase {
	getAll(features: ApiFeatures): Promise<Review[]>;
	getOne(id: string): Promise<Review | null>;
}
