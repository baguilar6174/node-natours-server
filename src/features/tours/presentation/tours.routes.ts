import { Request, Response, Router } from 'express';

import {
	CreateTourUseCase,
	DeleteTourUseCase,
	GetAllToursUseCase,
	GetMonthlyPlanToursUseCase,
	GetOneTourUseCase,
	GetStatsToursUseCase,
	SeedToursUseCase,
	UpdateTourUseCase
} from '../domain/use-cases';
import { RequestQuery } from '../../../core/types';
import { SERVER_ERROR_STATUS } from '../../../core/constants';

export default function ToursRouter(
	getAllToursUseCase: GetAllToursUseCase,
	getOneTourUseCase: GetOneTourUseCase,
	createTourUseCase: CreateTourUseCase,
	updateTourUseCase: UpdateTourUseCase,
	deleteTourUseCase: DeleteTourUseCase,
	seedToursUseCase: SeedToursUseCase,
	getStatsToursUseCase: GetStatsToursUseCase,
	getMonthlyPlanToursUseCase: GetMonthlyPlanToursUseCase
): Router {
	const router = Router();

	// Middlewares

	// Validate id
	// router.param('id', async (_: Request, res: Response, next: NextFunction, id: string) => {
	// 	try {
	// 		const tours = await getAllToursUseCase.execute();
	// 		if (Number(id) > tours.length) {
	// 			return res.status(404).json({
	// 				status: 'fail',
	// 				message: 'Invalid id'
	// 			});
	// 		}
	// 		return next();
	// 	} catch (err) {
	// 		res.status(500).send({ message: 'Error fetching data' });
	// 	}
	// });

	// Routes
	router.get('/seed', async (_: Request, res: Response): Promise<void> => {
		try {
			const result = await seedToursUseCase.execute();
			res.statusCode = 200;
			res.json({ status: 'success', message: result });
		} catch (err) {
			res.status(SERVER_ERROR_STATUS).send({ message: 'Error get', err });
		}
	});

	router.get('/stats', async (_: Request, res: Response): Promise<void> => {
		try {
			const stats = await getStatsToursUseCase.execute();
			res.statusCode = 200;
			res.json({ status: 'success', data: { stats } });
		} catch (err) {
			res.status(SERVER_ERROR_STATUS).send({ message: 'Error stats', err });
		}
	});

	router.get('/monthly-plan/:year', async (req: Request, res: Response): Promise<void> => {
		try {
			const { year } = req.params;
			const plan = await getMonthlyPlanToursUseCase.execute(Number(year));
			res.statusCode = 200;
			res.json({ status: 'success', data: { plan } });
		} catch (err) {
			res.status(SERVER_ERROR_STATUS).send({ message: 'Error stats', err });
		}
	});

	router.get('/', async (req: Request<object, object, object, RequestQuery>, res: Response): Promise<void> => {
		try {
			const { page, limit, sort, fields, ...query } = req.query;
			const pagination = { page, limit };
			const tours = await getAllToursUseCase.execute({ query, sort, fields, pagination });
			res.statusCode = 200;
			res.json({ status: 'success', results: tours.length, data: { tours } });
		} catch (err) {
			res.status(SERVER_ERROR_STATUS).send({ message: 'Error get', err });
		}
	});

	router.get('/:id', async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const tour = await getOneTourUseCase.execute(id);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(SERVER_ERROR_STATUS).send({ message: 'Error get one', err });
		}
	});

	router.post('/', async (req: Request, res: Response): Promise<void> => {
		try {
			const { body } = req;
			const tour = await createTourUseCase.execute(body);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(SERVER_ERROR_STATUS).send({ message: 'Error post', err });
		}
	});

	router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
		try {
			const {
				params: { id },
				body
			} = req;
			const tour = await updateTourUseCase.execute(id, body);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(SERVER_ERROR_STATUS).send({ message: 'Error patch', err });
		}
	});

	router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const tour = await deleteTourUseCase.execute(id);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(SERVER_ERROR_STATUS).send({ message: 'Error delete', err });
		}
	});

	return router;
}
