import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import { User } from '../../domain/entities/user.entity';
import { ONE_THOUSAND, PASSWORD_SALT } from '../../../../core/constants';
import { validateEmail } from '../../../../core/utils';

export interface UserSchemaFields extends User {
	createdAt: Date;
	passwordConfirm?: string;
	passwordChangeAt?: Date;
}
export interface UserSchemaMethods {
	validatePassword: (candidatePassword: string, password: string) => Promise<boolean>;
	changedPasswordAfter: (JWTTimestamp: number) => boolean;
}

const schema = new Schema<UserSchemaFields, UserSchemaMethods>(
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
		password: { type: String, required: [true, 'Please provide a password!'], minlength: 8, select: false },
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm yout password!'],
			validate: {
				validator: function (this: Pick<User, 'password'>, value: string): boolean {
					return value === this.password;
				},
				message: 'Passwords are not the same!'
			},
			select: false
		},
		passwordChangeAt: Date,
		createdAt: { type: Date, default: Date.now() },
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

schema.methods.validatePassword = async function (candidatePassword: string, password: string): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, password);
};

schema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
	if (this.passwordChangeAt) {
		const passwordChangeAtTimestamp = parseInt(`${this.passwordChangeAt.getTime() / ONE_THOUSAND}`, 10);
		return JWTTimestamp < passwordChangeAtTimestamp;
	}
	// False means NOT changes
	return false;
};

export interface UserDocument extends Document, UserSchemaMethods {}

export const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', schema);
