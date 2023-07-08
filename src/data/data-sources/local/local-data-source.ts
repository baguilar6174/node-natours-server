import { TourRequestModel, TourResponseModel } from '../../../domain/models/tour';
import { TourDataSource } from '../../interfaces/data-sources/tour-data-source';
import ToursData from '../../constants/tours-simple.json';

export class LocalBDContactDataSource implements TourDataSource {
	async delete(id: number): Promise<number> {
		return id;
	}

	async update(id: number, data: TourRequestModel) {
		const tour = Object.assign({ id }, data);
		return tour;
	}

	async getOne(id: number): Promise<TourResponseModel | undefined> {
		const tour = ToursData.find((tour): boolean => tour.id === Number(id));
		return tour;
	}

	async create(payload: TourRequestModel) {
		const id = ToursData[ToursData.length - 1].id + 1;
		const tour = Object.assign({ id }, payload);
		ToursData.push(tour);
		// TODO: save in file
		return tour;
	}

	async getAll(): Promise<TourResponseModel[]> {
		const tours = ToursData;
		return tours;
	}
}
