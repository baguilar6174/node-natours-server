import { NextFunction, Request, Response } from 'express';

import { HttpCode } from '../constants';
import { AppErrorArgs } from '../types';

export class AppError extends Error {
	public readonly name: string;
	public readonly statusCode: HttpCode;
	public readonly isOperational: boolean = true;

	constructor(args: AppErrorArgs) {
		super(args.message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = args.name || 'Error';
		this.statusCode = args.statusCode;
		if (args.isOperational !== undefined) this.isOperational = args.isOperational;
		Error.captureStackTrace(this);
	}
}

export const handleGlobalErrors = (error: AppError, _: Request, res: Response, next: NextFunction): void => {
	const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
	res.statusCode = statusCode;
	if (process.env.NODE_ENV === 'development') {
		res.json({ message: error.message, error, stack: error.stack });
	}
	if (process.env.NODE_ENV === 'production') {
		if (error.isOperational) {
			res.json({ message: error.message });
		} else {
			res.statusCode = HttpCode.INTERNAL_SERVER_ERROR;
			res.json({ message: 'Something went very wrong!' });
		}
	}
	next();
};
