import { v4 as uuidv4 } from 'uuid';

import { Tour, CreateTourDTO, UpdateTourDTO, Stat } from '../../../domain/entities/tour.entity';
import { TOURS_DATA } from '../../constants/tours-simple';
import { TourDataSource } from '../../interfaces/data-sources/tour-data-source';

export class LocalBDTourDataSource implements TourDataSource {
	async seed(): Promise<void> {
		// TODO: implement method
		// TODO: this method must be optional in this data source
	}

	async deleteOne(id: string): Promise<Tour | null> {
		// TODO: implement method
		const tourInBD = TOURS_DATA.find((tour): boolean => tour._id === id);
		if (!tourInBD) return null;
		return tourInBD;
	}

	async updateOne(id: string, data: UpdateTourDTO) {
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
}
