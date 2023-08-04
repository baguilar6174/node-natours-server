import { Model, Schema, model, models } from 'mongoose';

import { Entities } from '../../../../core/constants';
import { Booking } from '../../domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BookingSchemaFields extends Booking {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BookingSchemaMethods {}

const schema = new Schema<BookingSchemaFields, BookingSchemaMethods>(
	{
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		},
		tour: {
			type: Schema.ObjectId,
			ref: 'Tour',
			required: [true, 'Booking must have a tour related!']
		},
		price: { type: Number, required: [true, 'Booking must have a price!'] },
		paid: { type: Boolean, default: true }
	},
	{
		id: false,
		timestamps: true,
		versionKey: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

// Query middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function populateEntities(this: any, next: () => void): void {
	this.populate({ path: 'user tour' });
	next();
}

schema.pre(/^find/, populateEntities);

export interface BookingDocument extends Document, BookingSchemaMethods {}

export const BookingModel: Model<BookingSchemaFields & BookingDocument> =
	models.Booking || model<BookingSchemaFields & BookingDocument>(Entities.BOOKING, schema);
