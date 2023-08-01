import {
	CreateReviewUseCaseImpl,
	DeleteReviewUseCaseImpl,
	GetReviewsUseCaseImpl,
	ReviewService,
	UpdateReviewUseCaseImpl
} from '../../application';
import { ReviewRepositoryPort } from '../../domain';
import ReviewController from '../controllers/review.controller';
import { MongoReviewRepository } from '../repositories';

const getService = (repositoryPort: ReviewRepositoryPort): ReviewService => {
	return new ReviewService(
		new CreateReviewUseCaseImpl(repositoryPort),
		new DeleteReviewUseCaseImpl(repositoryPort),
		new GetReviewsUseCaseImpl(repositoryPort),
		new UpdateReviewUseCaseImpl(repositoryPort)
	);
};

export const reviewsController = ReviewController(getService(new MongoReviewRepository()));
