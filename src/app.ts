import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

export const get = (): Express => {
	const app: Express = express();

	// Port
	const PORT = process.env.PORT || 3000;

	// Config Values
	dotenv.config();

	app.use(
		cors({
			origin: ['http://localhost:4200'],
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			preflightContinue: false,
			optionsSuccessStatus: 204
		})
	);

	// Url prefix
	// const API_PREFIX = process.env.API_PREFIX || '/api/v1';

	// Settings
	app.set('port', process.env.PORT || 3000);

	// Body parsing Middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Test rest api
	app.get('/', async (req: Request, res: Response): Promise<Response> => {
		return res
			.status(200)
			.send({ message: `Welcome to Initial API! \n Endpoints available at http://localhost:${PORT}/api/v1` });
	});

	return app;
};

export const start = (): void => {
	const app = get();
	try {
		app.listen(app.get('port'), (): void => {
			console.log(`Server running on http://localhost:${app.get('port')}`);
		});
	} catch (error: any) {
		console.log(`Error occurred: ${error.message}`);
	}
};

start();
