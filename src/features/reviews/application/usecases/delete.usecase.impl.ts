import { Review } from '../../domain/entities/review.entity';
import { DeleteReviewUseCase } from '../../domain/ports/inputs';
import { ReviewRepositoryPort } from '../../domain/ports/outputs/review.repository.port';

export class DeleteReviewUseCaseImpl implements DeleteReviewUseCase {
	constructor(private repositoryPort: ReviewRepositoryPort) {}

	async delete(id: string): Promise<Review | null> {
		const result = await this.repositoryPort.delete(id);
		return result;
	}
}
