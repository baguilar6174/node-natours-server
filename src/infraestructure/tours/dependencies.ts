import { LocalBDContactDataSource } from '../../data/data-sources/local/local-data-source';
import { TourRepositoryImpl } from '../../domain/repositories/tour-repository';
import { CreateTours } from '../../domain/use-cases/tours/create';
import { DeleteTour } from '../../domain/use-cases/tours/delete';
import { GetAllTours } from '../../domain/use-cases/tours/get-all';
import { GetOneTours } from '../../domain/use-cases/tours/get-one';
import { UpdateTour } from '../../domain/use-cases/tours/update';
import ToursRouter from './tours.routes';

const dataSource = new LocalBDContactDataSource();
const tourRepositoryImpl = new TourRepositoryImpl(dataSource);

// useCases
const getAll = new GetAllTours(tourRepositoryImpl);
const getOne = new GetOneTours(tourRepositoryImpl);
const create = new CreateTours(tourRepositoryImpl);
const update = new UpdateTour(tourRepositoryImpl);
const deleteOne = new DeleteTour(tourRepositoryImpl);

export const toursRouter = ToursRouter(getAll, getOne, create, update, deleteOne);
