import { ApiFeatures } from '../../../../core/types';
import { CreateReviewDTO, Review, UpdateReviewDTO } from '../../domain/entities/review.entity';
import {
	CreateReviewUseCase,
	DeleteReviewUseCase,
	GetReviewsUseCase,
	UpdateReviewUseCase
} from '../../domain/ports/inputs';

export class ReviewService implements CreateReviewUseCase, DeleteReviewUseCase, GetReviewsUseCase, UpdateReviewUseCase {
	constructor(
		private createReviewUseCase: CreateReviewUseCase,
		private deleteReviewUseCase: DeleteReviewUseCase,
		private getReviewsUseCase: GetReviewsUseCase,
		private updateReviewUseCase: UpdateReviewUseCase
	) {}

	async create(data: CreateReviewDTO): Promise<Review> {
		const result = await this.createReviewUseCase.create(data);
		return result;
	}

	async delete(id: string): Promise<Review | null> {
		const result = await this.deleteReviewUseCase.delete(id);
		return result;
	}

	async getAll(features: ApiFeatures): Promise<Review[]> {
		const result = await this.getReviewsUseCase.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<Review | null> {
		const result = await this.getReviewsUseCase.getOne(id);
		return result;
	}

	async update(id: string, data: UpdateReviewDTO): Promise<Review | null> {
		const result = await this.updateReviewUseCase.update(id, data);
		return result;
	}
}
