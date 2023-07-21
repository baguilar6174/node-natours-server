import mongoose, { Model, Schema } from 'mongoose';
import { Tour } from '../../domain/entities/tour.entity';
import { FIVE, FORTY, ONE, SEVEN, TEN } from '../../../../core/constants';
import { createSlug } from '../../../../core/utils';

export interface TourSchemaFields extends Tour {
	createdAt: Date;
}

const schema = new Schema<TourSchemaFields>(
	{
		name: {
			type: String,
			required: [true, 'A tour must have a name'],
			unique: true,
			trim: true,
			maxlength: [FORTY, 'A tour name must have less or equal then 40 characters'],
			minlength: [TEN, 'A tour name must have more or equal then 10 characters']
		},
		duration: { type: Number, required: [true, 'A tour must have a duration'] },
		maxGroupSize: { type: Number, required: [true, 'A tour must have a max group size'] },
		difficulty: {
			type: String,
			required: [true, 'A tour must have a difficulty'],
			enum: {
				values: ['easy', 'medium', 'difficult'],
				message: 'Difficulty is either easy, medium, difficult'
			}
		},
		ratingsAverage: {
			type: Number,
			default: 0,
			min: [ONE, 'Ratin must be avobe 1.0'],
			max: [FIVE, 'Ratin must be below 5.0']
		},
		ratingsQuantity: { type: Number, default: 0 },
		price: { type: Number, required: [true, 'A tour must have a price'] },
		priceDiscount: {
			type: Number,
			validate: {
				validator: function (this: Pick<Tour, 'price'>, value: number): boolean {
					return value < this.price;
				},
				message: 'Discount price ({VALUE}) should be below regular price'
			}
		},
		summary: { type: String, trim: true, required: [true, 'A tour must have a summary'] },
		description: { type: String, trim: true },
		imageCover: { type: String, required: [true, 'A tour must have an image cover'] },
		images: [String],
		createdAt: { type: Date, default: Date.now() },
		startDates: [Date],
		slug: String,
		secretTour: {
			type: Boolean,
			default: false
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

schema.virtual('durationInWeeks').get(function (this: Pick<Tour, 'duration'>): number {
	return this.duration / SEVEN;
});

// Runs before save and create
schema.pre('save', function (this: Pick<Tour, 'name' | 'slug'>, next): void {
	this.slug = createSlug(this.name);
	next();
});

// Runs after create a document
// schema.post('save', function (doc, next) {
// 	console.log(doc);
// 	next();
// });

// Query middleware
// Filter results where secretTour = true
schema.pre('find', function (next) {
	this.find({ secretTour: { $ne: true } });
	next();
});

schema.pre('findOne', function (next) {
	this.findOne({ secretTour: { $ne: true } });
	next();
});

// Aggregation middleware
schema.pre('aggregate', function (next) {
	this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
	next();
});

export const TourModel: Model<Tour> = mongoose.models.Tour || mongoose.model('Tour', schema);
