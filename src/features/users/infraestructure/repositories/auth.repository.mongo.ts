import crypto from 'crypto';

import { HttpCode } from '../../../../core/constants';
import { UserModel } from '../models/user.model';
import { Auth, CreateUserDTO, User } from '../../domain/entities/user.entity';
import { AuthRepositoryPort, EmailServicePort } from '../../domain/ports/outputs';
import { AppError } from '../../../../core/error/app-error';
import { connectMongoDB, disconnectMongoDB, signToken } from '../../../../core/utils';

export class MongoAuthRepository implements AuthRepositoryPort {
	constructor(private emailServicePort: EmailServicePort) {}

	async signup(data: CreateUserDTO): Promise<Auth> {
		await connectMongoDB();
		const user = await UserModel.create(data);
		const token = signToken(user._id);
		await disconnectMongoDB();
		return { user, token };
	}

	async login(data: Pick<User, 'email' | 'password'>): Promise<Auth> {
		const { email, password } = data;

		// * 1) Check if email and password exists
		if (!email || !password) {
			throw new AppError({
				message: 'Please provide email and password',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}

		// * 2) Check if user exists && password is correct
		await connectMongoDB();
		const user = await UserModel.findOne({ email }).select('+password');

		if (!user) {
			throw new AppError({
				message: 'Invalid credentials',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}

		const isValidPassword = await user.validatePassword(password, user.password);

		if (!isValidPassword) {
			throw new AppError({
				message: 'Invalid credentials',
				statusCode: HttpCode.UNAUTHORIZED,
				name: 'Auth error'
			});
		}

		// * 3) If OK, send token to client
		const token = signToken(user._id);

		await disconnectMongoDB();
		return {
			user,
			token
		};
	}

	async forgotPassword(data: Pick<User, 'email'>, resetURL: string): Promise<string> {
		const { email } = data;

		await connectMongoDB();
		// * 1) Get user based on email
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw new AppError({
				message: 'There is no user with this email address',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}

		// * 2) Generate the random reset token
		const resetToken = user.createPasswordResetToken();
		await user.save();
		await disconnectMongoDB();

		// * 3) Send it to user's email
		try {
			await this.emailServicePort.sendEmail({
				email: user.email,
				subject: 'Your password reset token (valid for 10 mins)',
				text: `Forgot your password? Submit PATCH request with new password and passwordConfirm to: ${resetURL}/${resetToken}. If you didn't forget your password, please ignore this email!`
			});
			return 'Token sent to email';
		} catch (error) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save();
			throw new AppError({
				message: 'There was an error sending the email. Try again later!',
				statusCode: HttpCode.INTERNAL_SERVER_ERROR
			});
		}
	}

	async resetPassword(token: string, password: string): Promise<Auth> {
		// * 1) Get user based on the token
		const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
		await connectMongoDB();

		const document = await UserModel.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() }
		});

		// * 2) If token has not expired, and there is user, set new password
		if (!document) {
			throw new AppError({
				message: 'Token is invalid or has expired',
				statusCode: HttpCode.BAD_REQUEST
			});
		}

		document.password = password;
		document.passwordConfirm = password;
		document.passwordResetToken = undefined;
		document.passwordResetExpires = undefined;

		await document.save();

		await disconnectMongoDB();
		// * 3) Update changePasswordAt property for the user
		// * 4) Log the user in, send JWT
		return {
			user: document,
			token: signToken(document._id)
		};
	}

	async updatePassword(id: string, currentPassword: string, password: string, passwordConfirm: string): Promise<Auth> {
		// * 1) Get user from collection
		await connectMongoDB();
		const user = await UserModel.findById(id).select('+password');
		if (!user) {
			throw new AppError({
				message: 'Your current password is wrong',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}

		// * 2) Check if POSTed current password is correct
		const isValidPassword = await user.validatePassword(currentPassword, user.password);
		if (!isValidPassword) {
			throw new AppError({
				message: 'Your current password is wrong',
				statusCode: HttpCode.UNAUTHORIZED,
				name: 'Auth error'
			});
		}

		// * 3) If so, update password
		user.password = password;
		user.passwordConfirm = passwordConfirm;
		await user.save();

		// * 4) Log user in, send JWT
		await disconnectMongoDB();
		return {
			user,
			token: signToken(user._id)
		};
	}

	// * Only allows update email and name
	async updateUserData(
		id: string,
		password: string,
		passwordConfirm: string,
		data: Pick<User, 'email' | 'name'>
	): Promise<User> {
		const { email, name } = data;

		// * 1) Create error if user POSTs password data
		if (password || passwordConfirm) {
			throw new AppError({
				message: 'This route is not for password updates. Please use /updatePassword',
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		// * 2) Create error if name or email are undefined
		if (!name || !email) {
			throw new AppError({
				message: 'You need provide email or name to update your data!',
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		// * 3) Update user document
		await connectMongoDB();
		const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

		// TODO: verify if this error is neccesary
		if (!updatedUser) {
			throw new AppError({
				message: 'Invalid credentials',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}

		await disconnectMongoDB();
		return updatedUser;
	}

	async deleteAccount(id: string): Promise<User> {
		await connectMongoDB();
		const updatedUser = await UserModel.findByIdAndUpdate(id, { active: false });
		// TODO: verify if this error is neccesary
		if (!updatedUser) {
			throw new AppError({
				message: 'No user with this identifier',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}
		await disconnectMongoDB();
		return updatedUser;
	}
}
