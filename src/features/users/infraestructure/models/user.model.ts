import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import { User } from '../../domain/entities/user.entity';
import { PASSWORD_SALT } from '../../../../core/constants';

const validateEmail = (email: string): boolean => {
	// const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
};

const schema = new Schema(
	{
		name: { type: String, required: [true, 'Please tell us your name!'] },
		email: {
			type: String,
			required: [true, 'Please provide your email!'],
			unique: true,
			lowercase: true,
			trim: true,
			validate: {
				validator: validateEmail,
				message: (props): string => `${props.value} is not a valid email address!`
			}
		},
		photo: String,
		password: { type: String, required: [true, 'Please provide a password!'], minlength: 8 },
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm yout password!'],
			validate: {
				validator: function (this: Pick<User, 'password'>, value: string): boolean {
					return value === this.password;
				},
				message: 'Passwords are not the same!'
			}
		},
		role: String,
		active: Boolean
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

schema.pre('save', async function (this, next): Promise<void> {
	// Only run this function if password was actually modified
	if (!this.isModified('password') || !this.password) return next();
	// Encrypt password
	this.password = await bcrypt.hash(this.password, PASSWORD_SALT);
	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

export const UserModel: Model<User> = mongoose.models.Tour || mongoose.model('User', schema);
