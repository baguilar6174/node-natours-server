import { CloseTourParameters, Distance } from '../../entities';

export interface GetDistancesUseCase {
	getDistances(params: Omit<CloseTourParameters, 'distance'>): Promise<Distance[]>;
}
