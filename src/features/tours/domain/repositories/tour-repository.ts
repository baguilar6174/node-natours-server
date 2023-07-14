import { Tour, CreateTourDTO, UpdateTourDTO } from '../entities/tour.entity';

export interface TourRepository {
	seed(): Promise<string | void>;
	create(tour: CreateTourDTO): Promise<Tour>;
	delete(id: string): Promise<Tour | null>;
	update(id: string, data: UpdateTourDTO): Promise<Tour | null>;
	getAll(): Promise<Tour[]>;
	getOne(id: string): Promise<Tour | null>;
}
