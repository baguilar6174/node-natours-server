import { Model, Schema, model, models } from 'mongoose';
import { Tour } from '../../domain/entities/tour.entity';
import { Entities, FIVE, FORTY, ONE, SEVEN, TEN } from '../../../../core/constants';
import { createSlug } from '../../../../core/utils';

export interface TourSchemaFields extends Tour {
	priceDiscount: number;
	secretTour: boolean;
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
			max: [FIVE, 'Ratin must be below 5.0'],
			set: (value: number) => Math.round(value * TEN) / TEN
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
		startDates: [Date],
		slug: String,
		secretTour: {
			type: Boolean,
			default: false
		},
		startLocation: {
			type: {
				type: String,
				default: 'Point',
				enum: ['Point']
			},
			coordinates: [Number],
			address: String,
			description: String
		},
		locations: [
			{
				type: {
					type: String,
					default: 'Point',
					enum: ['Point']
				},
				coordinates: [Number],
				address: String,
				description: String,
				day: Number
			}
		],
		guides: [
			{
				type: Schema.ObjectId,
				ref: 'User'
			}
		]
	},
	{
		id: false,
		timestamps: true,
		versionKey: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

// Set index
schema.index({ price: 1 });
schema.index({ price: 1, ratingsAverage: -1 });
schema.index({ slug: 1 });
schema.index({ startLocation: '2dsphere' });

schema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'tour',
	localField: '_id'
});

schema.virtual('durationInWeeks').get(function (this: Pick<Tour, 'duration'>): number {
	return this.duration / SEVEN;
});

// Runs before save and create
schema.pre('save', function (this: Pick<Tour, 'name' | 'slug'>, next): void {
	this.slug = createSlug(this.name);
	next();
});

/* schema.pre('save', async function (this: Pick<Tour, 'guides'>, next): Promise<void> {
	if (!this.guides) return;
	const promises = this.guides.map(async (id) => {
		const user = await UserModel.findById(id);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return user!;
	});
	this.guides = await Promise.all(promises);
	next();
}); */

// Runs after create a document
// schema.post('save', function (doc, next) {
// 	console.log(doc);
// 	next();
// });

// Query middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function populateGuides(this: any, next: () => void) {
	this.populate({
		path: 'guides'
	});
	next();
}

schema.pre(/^find/, populateGuides);

// Filter results where secretTour = true
schema.pre('find', function (next): void {
	this.find({ secretTour: { $ne: true } });
	next();
});

schema.pre('findOne', function (next): void {
	this.findOne({ secretTour: { $ne: true } });
	next();
});

// Aggregation middleware
/* schema.pre('aggregate', function (next): void {
	this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
	next();
}); */

export const TourModel: Model<TourSchemaFields & Document> =
	models.Tour || model<TourSchemaFields & Document>(Entities.TOUR, schema);
