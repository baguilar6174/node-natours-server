import { TourRequestModel, TourResponseModel } from '@domain/models/tour';

export interface TourRepository {
	create(tour: TourRequestModel): Promise<TourResponseModel>;
	delete(id: number): Promise<number>;
	update(id: number, data: TourRequestModel): Promise<TourResponseModel>;
	getAll(): Promise<TourResponseModel[]>;
	getOne(id: number): Promise<TourResponseModel | undefined>;
}
