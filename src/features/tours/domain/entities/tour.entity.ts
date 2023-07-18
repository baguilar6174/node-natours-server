export interface Tour {
	_id: string;
	name: string;
	duration: number;
	maxGroupSize: number;
	difficulty: string;
	ratingsAverage: number;
	ratingsQuantity: number;
	price: number;
	priceDiscount: number;
	summary: string;
	description: string;
	imageCover: string;
	images: string[];
	startDates: string[];
}

export type CreateTourDTO = Omit<Tour, '_id'>;
export type UpdateTourDTO = Partial<Omit<Tour, '_id'>>;

export interface Stat {
	_id: string;
	numTours: number;
	numRating: number;
	avgRating: number;
	avgPrice: number;
	minPrice: number;
	maxPrice: number;
}

export interface Plan {
	numToursStarts: number;
	tours: string[];
	month: number;
}
