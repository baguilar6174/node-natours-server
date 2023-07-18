import { TourRepositoryImpl } from '../data/repositories/tour-repository';

import ToursRouter from './tours.routes';
import {
	CreateTour,
	DeleteTour,
	GetAllTours,
	GetOneTour,
	UpdateTour,
	SeedTours,
	GetStatsTours
} from '../domain/use-cases';
import { MongoDBTourDataSource } from '../data/data-sources';

const dataSource = new MongoDBTourDataSource();
const tourRepositoryImpl = new TourRepositoryImpl(dataSource);

// useCases
const getAll = new GetAllTours(tourRepositoryImpl);
const getOne = new GetOneTour(tourRepositoryImpl);
const create = new CreateTour(tourRepositoryImpl);
const update = new UpdateTour(tourRepositoryImpl);
const deleteOne = new DeleteTour(tourRepositoryImpl);
const seed = new SeedTours(tourRepositoryImpl);
const stats = new GetStatsTours(tourRepositoryImpl);

export const toursRouter = ToursRouter(getAll, getOne, create, update, deleteOne, seed, stats);
