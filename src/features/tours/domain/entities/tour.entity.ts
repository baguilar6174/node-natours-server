export interface Tour {
	_id: string;
	name: string;
	duration: number;
	maxGroupSize: number;
	difficulty: string;
	ratingsAverage: number;
	ratingsQuantity: number;
	price: number;
	summary: string;
	description: string;
	imageCover: string;
	images: string[];
	startDates: string[];
}

export type CreateTourDTO = Omit<Tour, '_id'>;
export type UpdateTourDTO = Partial<Omit<Tour, '_id'>>;
