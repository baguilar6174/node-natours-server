import { ApiFeatures } from '../../../../../core/types';
import { CreateTourDTO, Tour, UpdateTourDTO } from '../../../domain/entities/tour.entity';

export interface TourDataSource {
	seed(): Promise<string | void>;
	create(tour: CreateTourDTO): Promise<Tour>;
	getAll(features: ApiFeatures): Promise<Tour[]>;
	deleteOne(id: string): Promise<Tour | null>;
	updateOne(id: string, data: UpdateTourDTO): Promise<Tour | null>;
	getOne(id: string): Promise<Tour | null>;
}
