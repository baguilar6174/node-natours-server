import { CreateReviewDTO, Review } from '../../entities/review.entity';

export interface CreateReviewUseCase {
	create(data: CreateReviewDTO): Promise<Review>;
}
