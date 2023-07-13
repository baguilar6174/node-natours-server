import { CreateTourDTO, Tour, UpdateTourDTO } from '../../../domain/entities/tour.entity';

export interface TourDataSource {
	create(tour: CreateTourDTO): Promise<Tour>;
	getAll(): Promise<Tour[]>;
	deleteOne(id: string): Promise<Tour | null>;
	updateOne(id: string, data: UpdateTourDTO): Promise<Tour | null>;
	getOne(id: string): Promise<Tour | null>;
}
