import { TourRequestModel, TourResponseModel } from '../../../domain/models/tour';

export interface TourDataSource {
	create(tour: TourRequestModel): void;
	getAll(): Promise<TourResponseModel[]>;
	deleteOne(id: string): void;
	updateOne(id: string, data: TourRequestModel): void;
	getOne(id: string): Promise<TourResponseModel | undefined>;
}
