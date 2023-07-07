export type CreateTourDTO = {
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
};
