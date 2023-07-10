import { TourRequestModel, TourResponseModel } from '@domain/models/tour';

export interface GetAllToursUseCase {
	execute(): Promise<TourResponseModel[]>;
}

export interface GetOneToursUseCase {
	execute(id: number): Promise<TourResponseModel | undefined>;
}

export interface CreateTourUseCase {
	execute(tour: TourRequestModel): Promise<TourResponseModel>;
}

export interface UpdateTourUseCase {
	// TODO: partial props
	execute(id: number, data: TourRequestModel): Promise<TourResponseModel>;
}

export interface DeleteTourUseCase {
	execute(id: number): Promise<number>;
}
