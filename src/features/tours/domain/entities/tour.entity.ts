import { Review } from '../../../reviews/domain';
import { User } from '../../../users/domain/entities';

export interface Tour {
	_id: string;
	name: string;
	slug?: string;
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
	startDates: Date[] | string[];
	startLocation: StartTourLocation;
	guides?: string[] | User[];
	locations: TourLocation[];
	reviews?: string[] | Review[];
}

export interface StartTourLocation {
	description: string;
	type: string;
	coordinates: number[];
	address?: string;
}

export interface TourLocation extends StartTourLocation {
	day: number;
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

export type CloseTourParameters = {
	distance: number;
	center: {
		lat: number;
		lng: number;
	};
	unit: string;
};
