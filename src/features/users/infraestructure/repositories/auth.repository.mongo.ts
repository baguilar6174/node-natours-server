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
		const document = await UserModel.create(data);
		const user: User = document.toObject();
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
		const document = await UserModel.findOne({ email }).select('+password');

		if (!document) {
			throw new AppError({
				message: 'Invalid credentials',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}

		const user: User = document.toObject();
		const isValidPassword = await document.validatePassword(password, user.password);

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
		const document = await UserModel.findOne({ email });
		if (!document) {
			throw new AppError({
				message: 'There is no user with this email address',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}

		// * 2) Generate the random reset token
		const resetToken = document.createPasswordResetToken();
		await document.save();
		const user = document.toObject();
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
			document.passwordResetToken = undefined;
			document.passwordResetExpires = undefined;
			await document.save();
			throw new AppError({
				message: 'There was an error sending the email. Try again later!',
				statusCode: HttpCode.INTERNAL_SERVER_ERROR
			});
		}
	}

	async resetPassword(): Promise<any> {
		throw new Error('Method not implemented.');
	}
}
