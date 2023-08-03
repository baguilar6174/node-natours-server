import { Model, Schema, model, models } from 'mongoose';
import { Entities, FIVE, ONE, ZERO } from '../../../../core/constants';
import { Review } from '../../domain/entities/review.entity';
import { Tour } from '../../../tours/domain/entities/tour.entity';
import { TourModel } from '../../../tours/infraestructure/models/tour.model';
import { StatReview } from '../../domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReviewSchemaFields extends Review {}
export interface ReviewSchemaMethods {
	updateAvgRatings(tourId: string | Tour): Promise<void>;
	calcAvgRatingsCreate(tourId: string | Tour): Promise<void>;
}

const schema = new Schema<ReviewSchemaFields, ReviewSchemaMethods>(
	{
		review: {
			type: String,
			required: [true, 'Review can not be empty!'],
			trim: true
		},
		rating: {
			type: Number,
			min: ONE,
			max: FIVE
		},
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		},
		tour: {
			type: Schema.ObjectId,
			ref: 'Tour'
		}
	},
	{
		id: false,
		timestamps: true,
		versionKey: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

schema.index({ tour: 1, user: 1 }, { unique: true });

// TODO: Hide timestamps from JSON output
/* schema.set('toJSON', {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	transform: (_doc: any, ret: Record<string, any>) => {
		delete ret.createdAt;
		delete ret.updatedAt;
		return ret;
	}
}); */

// Query middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function populateEntities(this: any, next: () => void): void {
	this.populate({ path: 'user' });
	next();
}

schema.pre(/^find/, populateEntities);

async function calcAvgRatings(tourId: string | Tour): Promise<void> {
	const stats: StatReview[] = await ReviewModel.aggregate([
		{
			$match: { tour: tourId }
		},
		{
			$group: {
				_id: '$tour',
				ratingsQuantity: { $sum: 1 },
				ratingsAverage: { $avg: '$rating' }
			}
		}
	]);
	await TourModel.findByIdAndUpdate(tourId, {
		ratingsAverage: stats.length > ZERO ? stats[ZERO].ratingsAverage : ZERO,
		ratingsQuantity: stats.length > ZERO ? stats[ZERO].ratingsQuantity : ZERO
	});
}

// Calculate ratingsQuantity and ratingsAverage each time when user update or delete a review and save these values in Tour
schema.methods.updateAvgRatings = async function (tourId: string | Tour): Promise<void> {
	await calcAvgRatings(tourId);
};

// Calculate ratingsQuantity and ratingsAverage each time when user creates a review and save these values in Tour
schema.statics.calcAvgRatingsCreate = async function (tourId: string | Tour): Promise<void> {
	await calcAvgRatings(tourId);
};

schema.post('save', async function (): Promise<void> {
	const constructor = this.constructor as unknown as ReviewSchemaMethods;
	await constructor.calcAvgRatingsCreate(this.tour);
});

export interface ReviewDocument extends Document, ReviewSchemaMethods {}

export const ReviewModel: Model<ReviewSchemaFields & ReviewDocument> =
	models.Review || model<ReviewSchemaFields & ReviewDocument>(Entities.REVIEW, schema);
