import { TourResponseModel } from '../../models/tour';

export interface GetAllToursUseCase {
	execute(): Promise<TourResponseModel[]>;
}
