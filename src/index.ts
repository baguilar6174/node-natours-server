import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import router from './app.route';
import { DEFAULT_PORT, DEV_ENVIRONMENT, HttpCode, PROD_ENVIRONMENT } from './core/constants';
import { AppError } from './core/error/app-error';

// TODO: move this declaration
declare module 'express-serve-static-core' {
	interface Request {
		requestTime: string;
	}
}

export const get = async (): Promise<Express> => {
	const app: Express = express();

	// Port
	const PORT = process.env.PORT || DEFAULT_PORT;

	// Config Values
	dotenv.config();

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
	const API_PREFIX = process.env.API_PREFIX || '/api/v1';

	// Settings
	app.set('port', process.env.PORT || DEFAULT_PORT);

	// Body parsing Middleware
	if (process.env.NODE_ENV === DEV_ENVIRONMENT) app.use(morgan('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(path.join(__dirname, '../', 'public')));

	// Custom Middleware
	app.use((_req: Request, _res: Response, next: NextFunction) => {
		// console.log('Hello from the Middleware');
		next();
	});

	app.use((req: Request, _res: Response, next: NextFunction) => {
		req.requestTime = new Date().toISOString();
		next();
	});

	// Test rest api
	// * _ or _<param_name> to ignore the param
	app.get('/', async (_req: Request, res: Response): Promise<Response> => {
		return res
			.status(HttpCode.OK)
			.send({ message: `Welcome to Initial API! \n Endpoints available at http://localhost:${PORT}/api/v1` });
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
	router.use((error: AppError, _: Request, res: Response, next: NextFunction): void => {
		const { message, isOperational, stack } = error;
		const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
		if (process.env.NODE_ENV === DEV_ENVIRONMENT) {
			res.statusCode = statusCode;
			res.json({ message, error, stack });
		}
		if (process.env.NODE_ENV === PROD_ENVIRONMENT) {
			res.statusCode = isOperational ? statusCode : HttpCode.INTERNAL_SERVER_ERROR;
			res.json({ message: isOperational ? message : 'Something went very wrong!' });
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
