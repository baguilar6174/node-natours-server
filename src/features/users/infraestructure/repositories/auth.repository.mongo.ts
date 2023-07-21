import { HttpCode } from '../../../../core/constants';
import { UserModel } from '../models/user.model';
import { Auth, CreateUserDTO, User } from '../../domain/entities/user.entity';
import { AuthRepositoryPort } from '../../domain/ports/outputs';
import { AppError } from '../../../../core/error/app-error';
import { connectMongoDB, disconnectMongoDB, signToken } from '../../../../core/utils';

export class MongoAuthRepository implements AuthRepositoryPort {
	async signup(data: CreateUserDTO): Promise<Auth> {
		await connectMongoDB();
		const userDocument = await UserModel.create(data);
		const user: User = userDocument.toObject();
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
		const userDocument = await UserModel.findOne({ email }).select('+password');

		if (!userDocument) {
			throw new AppError({
				message: 'No user with this credentials',
				statusCode: HttpCode.BAD_REQUEST,
				name: 'Auth error'
			});
		}

		const user: User = userDocument.toObject();
		const isValidPassword = await userDocument.validatePassword(password, user.password);

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
}
