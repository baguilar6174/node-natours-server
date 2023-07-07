import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

import ToursData from './dev-data/data/tours-simple.json';

// TODO: move this declaration
declare module 'express-serve-static-core' {
	interface Request {
		requestTime: string;
	}
}

export const get = (): Express => {
	const app: Express = express();

	// Port
	const PORT = process.env.PORT || 3000;

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
	app.set('port', process.env.PORT || 3000);

	// Body parsing Middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Custom Middleware
	app.use((_req: Request, _res: Response, next: NextFunction) => {
		console.log('Hello from the Middleware');
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
			.status(200)
			.send({ message: `Welcome to Initial API! \n Endpoints available at http://localhost:${PORT}/api/v1` });
	});

	const getAllTours = (req: Request, res: Response): Response => {
		return res.status(200).json({
			status: 'success',
			requestTime: req.requestTime,
			results: ToursData.length,
			data: { tours: ToursData }
		});
	};

	const getTourById = (req: Request, res: Response): Response => {
		const { id } = req.params;
		const tour = ToursData.find((tour): boolean => tour.id === Number(id));

		if (!tour) {
			return res.status(404).json({
				status: 'fail',
				message: 'Invalid id'
			});
		}

		return res.status(200).json({
			status: 'success',
			data: tour
		});
	};

	const createTour = (req: Request, res: Response): void => {
		const id = ToursData[ToursData.length - 1].id + 1;
		const tour = Object.assign({ id }, req.body);
		ToursData.push(tour);
		const dir = `${__dirname}/dev-data/data/tours-simple.json`;
		fs.writeFile(dir, JSON.stringify(ToursData), () => {
			res.status(201).json({
				status: 'success',
				data: { tour }
			});
		});
	};

	const updateTour = (req: Request, res: Response): Response => {
		const { id } = req.params;

		if (Number(id) > ToursData.length) {
			return res.status(404).json({
				status: 'fail',
				message: 'Invalid id'
			});
		}

		return res.status(200).json({
			status: 'success',
			data: '<Update tour here...>'
		});
	};

	const deleteTour = (req: Request, res: Response): Response => {
		const { id } = req.params;

		if (Number(id) > ToursData.length) {
			return res.status(404).json({
				status: 'fail',
				message: 'Invalid id'
			});
		}

		return res.status(204).json({
			status: 'success',
			data: null
		});
	};

	app.route(`${API_PREFIX}/tours`).get(getAllTours).post(createTour);
	app.route(`${API_PREFIX}/tours:id`).get(getTourById).patch(updateTour).delete(deleteTour);

	return app;
};

export const start = (): void => {
	const app = get();
	try {
		app.listen(app.get('port'), (): void => {
			console.log(`Server running on http://localhost:${app.get('port')}`);
		});
	} catch (error) {
		console.log(`Error occurred: ${error}`);
	}
};

start();
