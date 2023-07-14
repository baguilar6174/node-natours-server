import mongoose, { Model, Schema } from 'mongoose';
import { Tour } from '../../domain/entities/tour.entity';

const schema = new Schema({
	name: { type: String, required: [true, 'A tour must have a name'], unique: true, trim: true },
	duration: { type: Number, required: [true, 'A tour must have a duration'] },
	maxGroupSize: { type: Number, required: [true, 'A tour must have a max group size'] },
	difficulty: { type: String, required: [true, 'A tour must have a difficulty'] },
	ratingsAverage: { type: Number, default: 0 },
	ratingsQuantity: { type: Number, default: 0 },
	price: { type: Number, required: [true, 'A tour must have a price'] },
	priceDiscount: Number,
	summary: { type: String, trim: true, required: [true, 'A tour must have a summary'] },
	description: { type: String, trim: true },
	imageCover: { type: String, required: [true, 'A tour must have an image cover'] },
	images: [String],
	createdAt: { type: Date, default: Date.now() },
	startDates: [Date]
});

export const TourModel: Model<Tour> = mongoose.models.Tour || mongoose.model('Tour', schema);
