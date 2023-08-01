import { Review } from '../../entities/review.entity';

export interface DeleteReviewUseCase {
	delete(id: string): Promise<Review | null>;
}
