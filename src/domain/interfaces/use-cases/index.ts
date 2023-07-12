import { TourRequestModel, TourResponseModel } from '../../../domain/models/tour';

export interface GetAllToursUseCase {
	execute(): Promise<TourResponseModel[]>;
}

export interface GetOneToursUseCase {
	execute(id: string): Promise<TourResponseModel | null>;
}

export interface CreateTourUseCase {
	execute(tour: TourRequestModel): Promise<TourResponseModel>;
}

export interface UpdateTourUseCase {
	// TODO: partial props
	execute(id: string, data: TourRequestModel): Promise<TourResponseModel | null>;
}

export interface DeleteTourUseCase {
	execute(id: string): Promise<string>;
}
