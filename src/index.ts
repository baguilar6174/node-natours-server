/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import router from './app.route';
import { DEV_ENVIRONMENT, HttpCode, JWTErrors, MongoErrors, PROD_ENVIRONMENT } from './core/constants';
import { AppError } from './core/error/app-error';
import { Error } from 'mongoose';
import EnvConfig from './core/env.config';

export const get = async (): Promise<Express> => {
	const app: Express = express();

	/* app.use(
		cors({
			origin: ['http://localhost:4200'],
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			preflightContinue: false,
			optionsSuccessStatus: 204
		})
	); */

	app.use(cors());

	// Url prefix
	const API_PREFIX = EnvConfig.API_PREFIX;

	// Settings
	app.set('port', EnvConfig.PORT);

	// Body parsing Middleware
	if (EnvConfig.NODE_ENV === DEV_ENVIRONMENT) app.use(morgan('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(path.join(__dirname, '../', 'public')));

	// Custom Middleware
	app.use((_req: Request, _res: Response, next: NextFunction) => {
		// console.log('Hello from the Middleware');
		next();
	});

	// Test rest api
	// * _ or _<param_name> to ignore the param
	app.get('/', async (_req: Request, res: Response): Promise<Response> => {
		return res
			.status(HttpCode.OK)
			.send({ message: `Welcome to Initial API! \n Endpoints available at http://localhost:${EnvConfig.PORT}/api/v1` });
	});

	app.use(API_PREFIX, router);

	// Handle not found routes
	router.all('*', (req: Request, _: Response, next: NextFunction): void => {
		next(
			new AppError({
				message: `Cant find ${req.originalUrl} on this server!`,
				statusCode: HttpCode.NOT_FOUND
			})
		);
	});

	// Middleware to handle errors
	// TODO: remove any
	router.use((error: AppError | any, _: Request, res: Response, next: NextFunction): void => {
		const { message, isOperational, name, stack } = error;
		const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
		if (EnvConfig.NODE_ENV === DEV_ENVIRONMENT) {
			// TODO: move this validations
			if (name === MongoErrors.CAST_ERROR) {
				const { path, value } = new Error.ValidatorError({ ...error }); // TODO: review this error type
				res.statusCode = HttpCode.BAD_REQUEST;
				res.json({ message: `Invalid ${path}: ${value}` });
				return;
			}
			if (error.code === MongoErrors.DUPLICATED_CODE) {
				const values = Object.keys(error.keyValue).map((key) => error.keyValue[key]);
				res.statusCode = HttpCode.BAD_REQUEST;
				res.json({ message: `Duplicated field value ${values}. Please use another value!` });
				return;
			}
			if (name === MongoErrors.VALIDATION_ERROR) {
				const values = Object.values(error.errors).map((e: any) => e.message); // TODO: review this error type
				res.statusCode = HttpCode.BAD_REQUEST;
				res.json({ message: `Invalid input data: ${values.join('. ')}` });
				return;
			}
			if (name === JWTErrors.JWT_ERROR) {
				res.statusCode = HttpCode.UNAUTHORIZED;
				res.json({ message: 'Invalid token! Please log in again.' });
				return;
			}
			if (name === JWTErrors.TOKEN_EXPIRED) {
				res.statusCode = HttpCode.UNAUTHORIZED;
				res.json({ message: 'Your token has expired! Please log in again.' });
				return;
			}

			res.statusCode = statusCode;
			res.json({ message, error, stack });
			return;
		}

		if (EnvConfig.NODE_ENV === PROD_ENVIRONMENT) {
			res.statusCode = isOperational ? statusCode : HttpCode.INTERNAL_SERVER_ERROR;
			res.json({ message: isOperational ? message : 'Something went very wrong!' });
			return;
		}

		next();
	});

	return app;
};

export const boostrap = async (): Promise<void> => {
	const app = await get();
	try {
		app.listen(app.get('port'), (): void => {
			console.log(`Server running on http://localhost:${app.get('port')}`);
		});
	} catch (error) {
		console.log(`Error occurred: ${error}`);
	}
};

boostrap();
