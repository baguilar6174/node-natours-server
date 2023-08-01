import { Review, UpdateReviewDTO } from '../../entities/review.entity';

export interface UpdateReviewUseCase {
	update(id: string, data: UpdateReviewDTO): Promise<Review | null>;
}
