import mongoose, { Model, Schema } from 'mongoose';
import { Tour } from '../../domain/entities/tour.entity';

const schema = new Schema({
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

export const TourModel: Model<Tour> = mongoose.models.TourResponseModel || mongoose.model('Tour', schema);
