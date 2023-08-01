import { Review, UpdateReviewDTO } from '../../domain/entities/review.entity';
import { UpdateReviewUseCase } from '../../domain/ports/inputs';
import { ReviewRepositoryPort } from '../../domain/ports/outputs/review.repository.port';

export class UpdateReviewUseCaseImpl implements UpdateReviewUseCase {
	constructor(private repositoryPort: ReviewRepositoryPort) {}

	async update(id: string, data: UpdateReviewDTO): Promise<Review | null> {
		const result = await this.repositoryPort.update(id, data);
		return result;
	}
}
