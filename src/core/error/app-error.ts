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
