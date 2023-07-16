import { Request, Response, Router } from 'express';

import {
	CreateTourUseCase,
	DeleteTourUseCase,
	GetAllToursUseCase,
	GetOneTourUseCase,
	SeedToursUseCase,
	UpdateTourUseCase
} from '../domain/use-cases';
import { parseQuery } from '../../../core/utils';
import { RequestQuery } from '../../../core/types';

export default function ToursRouter(
	getAllToursUseCase: GetAllToursUseCase,
	getOneTourUseCase: GetOneTourUseCase,
	createTourUseCase: CreateTourUseCase,
	updateTourUseCase: UpdateTourUseCase,
	deleteTourUseCase: DeleteTourUseCase,
	seedToursUseCase: SeedToursUseCase
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
			res.status(500).send({ message: 'Error get', err });
		}
	});

	router.get('/', async (req: Request<object, object, object, RequestQuery>, res: Response): Promise<void> => {
		try {
			const { page, sort, fields, limit, ...query } = req.query;
			const filteringQuery = parseQuery(query);
			const tours = await getAllToursUseCase.execute(filteringQuery, sort);
			res.statusCode = 200;
			res.json({ status: 'success', results: tours.length, data: { tours } });
		} catch (err) {
			res.status(500).send({ message: 'Error get', err });
		}
	});

	router.get('/:id', async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const tour = await getOneTourUseCase.execute(id);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(500).send({ message: 'Error get one', err });
		}
	});

	router.post('/', async (req: Request, res: Response): Promise<void> => {
		try {
			const { body } = req;
			const tour = await createTourUseCase.execute(body);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(500).send({ message: 'Error post', err });
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
			res.status(500).send({ message: 'Error patch', err });
		}
	});

	router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const tour = await deleteTourUseCase.execute(id);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(500).send({ message: 'Error delete', err });
		}
	});

	return router;
}
