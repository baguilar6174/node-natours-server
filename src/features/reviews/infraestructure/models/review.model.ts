import { Model, Schema, model, models } from 'mongoose';
import { Entities, FIVE, ONE } from '../../../../core/constants';
import { Review } from '../../domain/entities/review.entity';

export interface ReviewSchemaFields extends Review {
	createdAt: Date;
}

const schema = new Schema<ReviewSchemaFields>(
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
		createdAt: { type: Date, default: Date.now() },
		user: {
			type: Schema.ObjectId,
			ref: 'User',
			required: [true, 'Review must belong to a user!']
		},
		tour: {
			type: Schema.ObjectId,
			ref: 'Tour',
			required: [true, 'Review must belong to a tour!']
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

// Query middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function populateEntities(this: any, next: () => void) {
	this.populate({
		path: 'user tour',
		select: '-__v'
	});
	next();
}

schema.pre(/^find/, populateEntities);

export const ReviewModel: Model<ReviewSchemaFields & Document> =
	models.Review || model<ReviewSchemaFields & Document>(Entities.REVIEW, schema);
