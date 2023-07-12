import { TourRequestModel, TourResponseModel } from '../../../domain/models/tour';

export interface TourRepository {
	create(tour: TourRequestModel): Promise<TourResponseModel>;
	delete(id: string): Promise<string>;
	update(id: string, data: TourRequestModel): Promise<TourResponseModel | null>;
	getAll(): Promise<TourResponseModel[]>;
	getOne(id: string): Promise<TourResponseModel | null>;
}
