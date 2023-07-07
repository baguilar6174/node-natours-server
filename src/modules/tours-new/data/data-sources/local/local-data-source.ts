import { TourRequestModel, TourResponseModel } from '../../../domain/models/tour';
import { TourDataSource } from '../../interfaces/data-sources/tour-data-source';
import ToursData from '../../../../../dev-data/data/tours-simple.json';

export class LocalBDContactDataSource implements TourDataSource {
	async deleteOne(id: string) {
		return { id };
	}

	async updateOne(id: string, data: TourRequestModel) {
		return { id, ...data };
	}

	async getOne(id: string): Promise<TourResponseModel | undefined> {
		const tour = ToursData.find((tour): boolean => tour.id === Number(id));
		return tour;
	}

	async create(payload: TourRequestModel) {
		const id = ToursData[ToursData.length - 1].id + 1;
		const tour = Object.assign({ id }, payload);
		ToursData.push(tour);
	}

	async getAll(): Promise<TourResponseModel[]> {
		const tours = ToursData;
		return tours;
	}
}
