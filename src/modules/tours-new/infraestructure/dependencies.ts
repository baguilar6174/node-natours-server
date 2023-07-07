import { LocalBDContactDataSource } from '../data/data-sources/local/local-data-source';
import { TourRepositoryImpl } from '../domain/repositories/tour-repository';
import { GetAllTours } from '../domain/use-cases/get-all';
import ToursRouter from './tours.routes';

const dataSource = new LocalBDContactDataSource();
const tourRepositoryImpl = new TourRepositoryImpl(dataSource);

// useCases
const getAllTours = new GetAllTours(tourRepositoryImpl);

export const tourMiddleWare = ToursRouter(getAllTours);
