import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
// TODO: remove this to infraestructure layer
import { Error } from 'mongoose';

import router from './app.route';
import {
	DEV_ENVIRONMENT,
	HttpCode,
	JWTErrors,
	MongoErrors,
	ONE_HUNDRED,
	ONE_THOUSAND,
	PROD_ENVIRONMENT,
	SIXTY,
	AppError
} from './core';
import EnvConfig from './core/config/env.config';

export const get = async (): Promise<Express> => {
	const app: Express = express();

	// Set security HTTP headers
	app.use(helmet());

	/* app.use(
		cors({
			origin: ['http://localhost:4200'],
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			preflightContinue: false,
			optionsSuccessStatus: 204
		})
	); */

	// Confihure CORS
	app.use(cors());

	// Url prefix
	const API_PREFIX = EnvConfig.API_PREFIX;

	// Settings
	app.set('port', EnvConfig.PORT);

	// Body parsing Middleware
	if (EnvConfig.NODE_ENV === DEV_ENVIRONMENT) app.use(morgan('dev'));

	// Using express limit to resctrict many requests from the same IP
	app.use(
		API_PREFIX,
		rateLimit({
			max: ONE_HUNDRED,
			windowMs: SIXTY * SIXTY * ONE_THOUSAND,
			message: 'Too many requests from this IP, please try again in one hour'
		})
	);

	// Body parser, reading data from body
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Data sanitization against NOSQL query injection
	app.use(mongoSanitize());

	// Serving static files
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
