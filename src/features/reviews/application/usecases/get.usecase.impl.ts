import { ApiFeatures } from '../../../../core/types';
import { Review } from '../../domain/entities/review.entity';
import { GetReviewsUseCase } from '../../domain/ports/inputs';
import { ReviewRepositoryPort } from '../../domain/ports/outputs/review.repository.port';

export class GetReviewsUseCaseImpl implements GetReviewsUseCase {
	constructor(private repositoryPort: ReviewRepositoryPort) {}

	async getAll(features: ApiFeatures): Promise<Review[]> {
		const result = await this.repositoryPort.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<Review | null> {
		const result = await this.repositoryPort.getOne(id);
		return result;
	}
}
