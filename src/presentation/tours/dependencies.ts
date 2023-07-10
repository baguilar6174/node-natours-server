import { LocalBDTourDataSource } from '../../data/data-sources/local/local-data-source';

import { TourRepositoryImpl } from '../../domain/repositories/tour-repository';

import ToursRouter from './tours.routes';
import { CreateTours, DeleteTour, GetAllTours, GetOneTours, UpdateTour } from '../../domain/use-cases/tours';

const dataSource = new LocalBDTourDataSource();
const tourRepositoryImpl = new TourRepositoryImpl(dataSource);

// useCases
const getAll = new GetAllTours(tourRepositoryImpl);
const getOne = new GetOneTours(tourRepositoryImpl);
const create = new CreateTours(tourRepositoryImpl);
const update = new UpdateTour(tourRepositoryImpl);
const deleteOne = new DeleteTour(tourRepositoryImpl);

export const toursRouter = ToursRouter(getAll, getOne, create, update, deleteOne);
