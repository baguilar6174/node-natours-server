import {
	TourService,
	CreateTourUseCaseImpl,
	DeleteTourUseCaseImpl,
	GetToursUseCaseImpl,
	GetMonthlyPlanToursUseCaseImpl,
	GetStatsToursUseCaseImpl,
	SeedToursUseCaseImpl,
	UpdateTourUseCaseImpl
} from '../../application';
import { TourRepositoryPort } from '../../domain';
import TourController from '../controllers/tour.controller';
import { MongoTourRepository } from '../repositories';

const getService = (repositoryPort: TourRepositoryPort): TourService => {
	return new TourService(
		new CreateTourUseCaseImpl(repositoryPort),
		new DeleteTourUseCaseImpl(repositoryPort),
		new GetToursUseCaseImpl(repositoryPort),
		new GetMonthlyPlanToursUseCaseImpl(repositoryPort),
		new GetStatsToursUseCaseImpl(repositoryPort),
		new SeedToursUseCaseImpl(repositoryPort),
		new UpdateTourUseCaseImpl(repositoryPort)
	);
};

export const toursController = TourController(getService(new MongoTourRepository()));
