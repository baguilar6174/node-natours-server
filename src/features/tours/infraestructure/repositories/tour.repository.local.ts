import { v4 as uuidv4 } from 'uuid';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';
import {
	CloseTourParameters,
	CreateTourDTO,
	Distance,
	Plan,
	Stat,
	Tour,
	UpdateTourDTO
} from '../../domain/entities/tour.entity';
import { TOURS_DATA } from '../constants/tours-simple';

export class LocalTourRepository implements TourRepositoryPort {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(_id: string): Promise<Tour | null> {
		throw new Error('Method not implemented.');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async update(_id: string, _data: UpdateTourDTO): Promise<Tour | null> {
		return null;
	}

	async getOne(id: string): Promise<Tour | null> {
		const tour = TOURS_DATA.find((tour): boolean => tour._id === id);
		if (!tour) return null;
		return tour;
	}

	async create(data: CreateTourDTO): Promise<Tour> {
		const id = uuidv4();
		const tour = Object.assign({ _id: id }, data);
		return tour;
	}

	async getAll(): Promise<Tour[]> {
		const tours = TOURS_DATA;
		return tours;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getCloserTours(_params: CloseTourParameters): Promise<Tour[]> {
		throw new Error('Method not implemented.');
	}

	getStats(): Promise<Stat[]> {
		throw new Error('Method not implemented.');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getMonthlyPlan(_year: number): Promise<Plan[]> {
		throw new Error('Method not implemented.');
	}

	seed(): Promise<string | void> {
		throw new Error('Method not implemented.');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getDistances(_params: Omit<CloseTourParameters, 'distance'>): Promise<Distance[]> {
		throw new Error('Method not implemented.');
	}
}
