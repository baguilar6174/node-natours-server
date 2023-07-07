import { TourRequestModel, TourResponseModel } from '../../models/tour';

export interface TourRepository {
	create(tour: TourRequestModel): void;
	delete(id: string): void;
	update(id: string, data: TourRequestModel): void;
	getAll(): Promise<TourResponseModel[]>;
	getOne(id: string): Promise<TourResponseModel | undefined>;
}
