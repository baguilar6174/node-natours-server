import { Model, Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../../domain/entities';
import { Entities, ONE_THOUSAND, PASSWORD_SALT, RESET_TOKEN_SIZE, Roles, SIXTY, TEN } from '../../../../core/constants';
import { validateEmail } from '../../../../core/utils';

export interface UserSchemaFields extends User {
	active: boolean;
	password: string;
	passwordConfirm?: string;
	passwordResetToken?: string;
	passwordResetExpires?: Date;
}
export interface UserSchemaMethods {
	validatePassword: (candidatePassword: string, password: string) => Promise<boolean>;
	changedPasswordAfter: (JWTTimestamp: number) => boolean;
	createPasswordResetToken: () => string;
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
				validator: function (this: { password: string }, value: string): boolean {
					return value === this.password;
				},
				message: 'Passwords are not the same!'
			},
			select: false
		},
		passwordChangeAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		role: {
			type: String,
			enum: {
				values: [...Object.values(Roles)]
			},
			default: Roles.USER
		},
		active: {
			type: Boolean,
			default: true,
			select: false
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

schema.pre('save', async function (this, next): Promise<void> {
	// Only run this function if password was actually modified
	if (!this.isModified('password') || !this.password) return next();
	// Encrypt password
	this.password = await bcrypt.hash(this.password, PASSWORD_SALT);
	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

schema.pre('save', async function (this, next): Promise<void> {
	if (!this.isModified('password') || this.isNew) return next();
	// Save passwordChangeAt field when user changes his/her password
	this.passwordChangeAt = new Date(Date.now() - ONE_THOUSAND);
	next();
});

// TODO: this filter for all find methods
schema.pre('find', function (next): void {
	this.find({ active: { $ne: false } });
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

schema.methods.createPasswordResetToken = function (): string {
	const resetToken = crypto.randomBytes(RESET_TOKEN_SIZE).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetExpires = Date.now() + TEN * SIXTY * ONE_THOUSAND;
	return resetToken;
};

export interface UserDocument extends Document, UserSchemaMethods {}

export const UserModel: Model<UserSchemaFields & UserDocument> =
	models.User || model<UserSchemaFields & UserDocument>(Entities.USER, schema);
