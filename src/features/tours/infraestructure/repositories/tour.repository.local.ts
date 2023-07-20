import { v4 as uuidv4 } from 'uuid';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';
import { CreateTourDTO, Plan, Stat, Tour, UpdateTourDTO } from '../../domain/entities/tour.entity';
import { TOURS_DATA } from '../constants/tours-simple';

export class LocalTourRepository implements TourRepositoryPort {
	async delete(id: string): Promise<Tour | null> {
		// TODO: implement method
		const tourInBD = TOURS_DATA.find((tour): boolean => tour._id === id);
		if (!tourInBD) return null;
		return tourInBD;
	}

	async update(id: string, data: UpdateTourDTO) {
		const tourInBD = TOURS_DATA.find((tour): boolean => tour._id === id);
		if (!tourInBD) return null;
		// TODO: implement method
		const tour = { ...tourInBD, ...data };
		return tour;
	}

	async getOne(id: string): Promise<Tour | null> {
		const tour = TOURS_DATA.find((tour): boolean => tour._id === id);
		if (!tour) return null;
		return tour;
	}

	async create(payload: CreateTourDTO) {
		const id = uuidv4();
		const tour = Object.assign({ _id: id }, payload);
		TOURS_DATA.push(tour);
		return tour;
	}

	async getAll(): Promise<Tour[]> {
		const tours = TOURS_DATA;
		return tours;
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
}
