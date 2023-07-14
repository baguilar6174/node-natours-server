import mongoose, { Model, Schema } from 'mongoose';
import { Tour } from '../../domain/entities/tour.entity';

const schema = new Schema({
	name: { type: String, required: [true, 'A tour must have a name'], unique: true },
	duration: Number,
	maxGroupSize: Number,
	difficulty: String,
	ratingsAverage: { type: Number, default: 0 },
	ratingsQuantity: { type: Number, default: 0 },
	price: { type: Number, required: [true, 'A tour must have a price'] },
	summary: String,
	description: String,
	imageCover: String,
	images: Array,
	startDates: Array
});

export const TourModel: Model<Tour> = mongoose.models.Tour || mongoose.model('Tour', schema);
