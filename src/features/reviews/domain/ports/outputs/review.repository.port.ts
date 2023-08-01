import { ApiFeatures } from '../../../../../core/types';
import { CreateReviewDTO, Review, UpdateReviewDTO } from '../../entities/review.entity';

export interface ReviewRepositoryPort {
	create(data: CreateReviewDTO): Promise<Review>;
	delete(id: string): Promise<Review | null>;
	update(id: string, data: UpdateReviewDTO): Promise<Review | null>;
	getAll(features: ApiFeatures): Promise<Review[]>;
	getOne(id: string): Promise<Review | null>;
}
