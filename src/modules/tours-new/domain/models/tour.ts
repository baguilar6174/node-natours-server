export interface TourRequestModel {
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

export interface TourResponseModel {
	id: number;
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
