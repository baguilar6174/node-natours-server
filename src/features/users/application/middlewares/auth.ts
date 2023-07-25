import { Request, Response, NextFunction } from 'express';

import { EMPTY_STRING, HttpCode, ONE } from '../../../../core/constants';
import { CustomJwtPayload } from '../../../../core/types';
import { AppError } from '../../../../core/error/app-error';
import { JwtPayload, VerifyErrors, verify } from 'jsonwebtoken';
import EnvConfig from '../../../../core/env.config';
import { connectMongoDB, disconnectMongoDB } from '../../../../core/utils';
import { UserModel } from '../../infraestructure/models/user.model';
import { User } from '../../domain/entities/user.entity';

declare module 'express-serve-static-core' {
	interface Request {
		user: User;
	}
}

export const protect = async <T = object>(req: Request<object, object, object, T>, _: Response, next: NextFunction) => {
	// * 1) Getting token and check it's there
	let token = '';
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(EMPTY_STRING)[ONE];
	}
	if (!token) {
		return next(
			new AppError({
				message: 'You are not logged in! Please log in to get access!',
				statusCode: HttpCode.UNAUTHORIZED,
				name: 'Auth error'
			})
		);
	}
	// * 2) Verification token
	const decoded = verify(
		token,
		EnvConfig.JWT_SECRET,
		{},
		(err: VerifyErrors | null, value: string | JwtPayload | undefined) => {
			if (err) {
				return next(
					// * I can cath error here
					/* new AppError({...*/
					// * Or sendint to cath errors in index.ts
					err
				);
			}
			return value;
		}
	) as unknown as CustomJwtPayload;
	// * 3) Check if user still exists

	// TODO: verify correct layer for this
	await connectMongoDB();
	const user = await UserModel.findById(decoded.id);
	if (!user) {
		return next(
			new AppError({
				message: 'The user belonging to this token does no longer exist.',
				statusCode: HttpCode.UNAUTHORIZED
			})
		);
	}
	await disconnectMongoDB();

	// * 4) Check if user changed password after the token was issued
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const changedPasswordAfter = user.changedPasswordAfter(decoded.iat!);

	if (changedPasswordAfter) {
		return next(
			new AppError({
				message: 'User recently changed password! Please, log in again',
				statusCode: HttpCode.UNAUTHORIZED
			})
		);
	}

	// * Grant access to protected route
	req.user = user;
	next();
};

export const restrictTo = (...roles: string[]) => {
	return (req: Request<object, object, object, object>, _: Response, next: NextFunction) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError({
					message: 'You do not have permission to perfom this action',
					statusCode: HttpCode.FORBIDDEN
				})
			);
		}
		next();
	};
};
