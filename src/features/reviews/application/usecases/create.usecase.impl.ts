import { CreateReviewDTO, Review } from '../../domain/entities/review.entity';
import { CreateReviewUseCase } from '../../domain/ports/inputs';
import { ReviewRepositoryPort } from '../../domain/ports/outputs/review.repository.port';

export class CreateReviewUseCaseImpl implements CreateReviewUseCase {
	constructor(private repositoryPort: ReviewRepositoryPort) {}

	async create(data: CreateReviewDTO): Promise<Review> {
		const result = await this.repositoryPort.create(data);
		return result;
	}
}
