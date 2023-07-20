import { TourService } from '../../application/services/tour.service';
import {
	CreateTourUseCaseImpl,
	DeleteTourUseCaseImpl,
	GetAllToursUseCaseImpl,
	GetMonthlyPlanToursUseCaseImpl,
	GetOneTourUseCaseImpl,
	GetStatsToursUseCaseImpl,
	SeedToursUseCaseImpl,
	UpdateTourUseCaseImpl
} from '../../application/usecases';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';
import TourController from '../controllers/tour.controller';
import { MongoTourRepository } from '../repositories/tour.repository.mongo';

const getService = (repositoryPort: TourRepositoryPort): TourService => {
	return new TourService(
		new CreateTourUseCaseImpl(repositoryPort),
		new DeleteTourUseCaseImpl(repositoryPort),
		new GetAllToursUseCaseImpl(repositoryPort),
		new GetMonthlyPlanToursUseCaseImpl(repositoryPort),
		new GetOneTourUseCaseImpl(repositoryPort),
		new GetStatsToursUseCaseImpl(repositoryPort),
		new SeedToursUseCaseImpl(repositoryPort),
		new UpdateTourUseCaseImpl(repositoryPort)
	);
};

const repositoryPort = new MongoTourRepository();

export const toursController = TourController(getService(repositoryPort));
