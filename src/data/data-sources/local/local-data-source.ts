import { TourRequestModel, TourResponseModel } from '../../../domain/models/tour';
import { TOURS_DATA } from '../../constants/tours-simple';
import { TourDataSource } from '../../interfaces/data-sources/tour-data-source';

export class LocalBDTourDataSource implements TourDataSource {
	async delete(id: number): Promise<number> {
		return id;
	}

	async update(id: number, data: TourRequestModel) {
		const tour = Object.assign({ id }, data);
		return tour;
	}

	async getOne(id: number): Promise<TourResponseModel | undefined> {
		const tour = TOURS_DATA.find((tour): boolean => tour.id === Number(id));
		return tour;
	}

	async create(payload: TourRequestModel) {
		const id = TOURS_DATA[TOURS_DATA.length - 1].id + 1;
		const tour = Object.assign({ id }, payload);
		TOURS_DATA.push(tour);
		return tour;
	}

	async getAll(): Promise<TourResponseModel[]> {
		const tours = TOURS_DATA;
		return tours;
	}
}
