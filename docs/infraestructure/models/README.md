# 6

## infraestructure/models

Models are definitions that help you interact with the external data source. In this case I am using a Mongoose Model. In this case you can consider using the **Value Objects** pattern to have model definitions, validations and custom controls.

**For example (Mongoose Model):**

```typescript
// your imports here

interface TourSchemaFields extends Tour {}
interface TourSchemaMethods {}

const schema = new Schema<TourSchemaFields, TourSchemaMethods>(
	{
		name: {
			type: String,
			unique: true,
			trim: true,
		},
		duration: { type: Number, required: true },
		maxGroupSize: { type: Number, required: true },
		difficulty: {
			type: String,
			required: true,
			enum: {
				values: ['easy', 'medium', 'difficult']
			}
		},
		...
	},
	{
		id: false,
		timestamps: true,
		versionKey: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

...

export interface TourDocument extends Document, TourSchemaMethods {}

export const TourModel: Model<TourSchemaFields & TourDocument> =
	models.Tour || model<TourSchemaFields & TourDocument>(Entities.TOUR, schema);

```
