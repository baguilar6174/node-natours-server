import mongoose, { Model, Schema } from 'mongoose';
import { User } from '../../domain/models/user.model';

const schema = new Schema(
	{
		name: String,
		email: String,
		role: String,
		active: Boolean,
		photo: String,
		password: String
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

export const UserModel: Model<User> = mongoose.models.Tour || mongoose.model('User', schema);
