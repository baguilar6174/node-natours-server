import { Stat } from '../../entities/tour.entity';

export interface GetStatsToursUseCase {
	getStats(): Promise<Stat[]>;
}
