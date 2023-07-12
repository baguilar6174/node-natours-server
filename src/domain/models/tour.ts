import mongoose, { Model, Schema } from 'mongoose';
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

export type ITour = TourResponseModel;

const entrySchema = new Schema({
	name: { type: String, required: true },
	duration: { type: Number, required: true },
	maxGroupSize: { type: Number, required: true },
	difficulty: { type: String, required: true },
	ratingsAverage: { type: Number, required: true },
	ratingsQuantity: { type: Number, required: true },
	price: { type: Number, required: true },
	summary: { type: String, required: true },
	description: { type: String, required: true },
	imageCover: { type: String, required: true },
	images: { type: Array, required: true },
	startDates: { type: Array, required: true }
});

const TourModel: Model<ITour> = mongoose.models.TourResponseModel || mongoose.model('Tour', entrySchema);

export default TourModel;

// export type CreateTourDTO = {
// 	name: string;
// 	duration: number;
// 	maxGroupSize: number;
// 	difficulty: string;
// 	ratingsAverage: number;
// 	ratingsQuantity: number;
// 	price: number;
// 	summary: string;
// 	description: string;
// 	imageCover: string;
// 	images: string[];
// 	startDates: string[];
// };

// export type UpdateTourDto = Partial<CreateTourDTO>;
