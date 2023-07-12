import { TourDataSource } from '../../interfaces/data-sources/tour-data-source';
import { default as Tour, TourRequestModel } from '../../../domain/models/tour';

export class MongoDBContactDataSource implements TourDataSource {
	async deleteOne(id: string) {
		const tour = await Tour.findById(id);
		await tour?.deleteOne();
		return id;
	}

	async updateOne(id: string, data: TourRequestModel) {
		const updatedTour = await Tour.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		return updatedTour;
	}

	async getOne(id: string) {
		const tour = await Tour.findById(id);
		return tour;
	}

	async create(data: TourRequestModel) {
		const tour = new Tour({
			...data
		});
		await tour.save();
		return data;
	}

	async getAll() {
		const result = await Tour.find();
		return result;
	}
}
