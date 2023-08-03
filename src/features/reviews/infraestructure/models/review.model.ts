import { Model, Schema, model, models } from 'mongoose';
import { Entities, FIVE, ONE } from '../../../../core/constants';
import { Review } from '../../domain/entities/review.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReviewSchemaFields extends Review {}

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
function populateEntities(this: any, next: () => void) {
	this.populate({ path: 'user' });
	next();
}

schema.pre(/^find/, populateEntities);

export const ReviewModel: Model<ReviewSchemaFields & Document> =
	models.Review || model<ReviewSchemaFields & Document>(Entities.REVIEW, schema);
