import { TourRequestModel, TourResponseModel } from '../../../domain/models/tour';

export interface TourDataSource {
	create(tour: TourRequestModel): Promise<TourResponseModel>;
	getAll(): Promise<TourResponseModel[]>;
	deleteOne(id: string): Promise<string>;
	updateOne(id: string, data: TourRequestModel): Promise<TourResponseModel | null>;
	getOne(id: string): Promise<TourResponseModel | null>;
}
