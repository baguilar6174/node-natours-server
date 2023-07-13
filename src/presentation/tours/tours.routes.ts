import { NextFunction, Request, Response, Router } from 'express';

import { validateBody } from './middlewares';

import { CreateTours, DeleteTour, GetAllTours, GetOneTours, UpdateTour } from '../../domain/use-cases/tours';

export default function ToursRouter(
	getAllToursUseCase: GetAllTours,
	getOneToursUseCase: GetOneTours,
	createTourUseCase: CreateTours,
	updateTourUseCase: UpdateTour,
	deleteTourUseCase: DeleteTour
): Router {
	const router = Router();

	// Middlewares

	// Validate id
	router.param('id', async (_: Request, res: Response, next: NextFunction, id: string) => {
		try {
			const tours = await getAllToursUseCase.execute();
			if (Number(id) > tours.length) {
				return res.status(404).json({
					status: 'fail',
					message: 'Invalid id'
				});
			}
			return next();
		} catch (err) {
			res.status(500).send({ message: 'Error fetching data' });
		}
	});

	// Routes
	router.get('/', async (_: Request, res: Response): Promise<void> => {
		try {
			const tours = await getAllToursUseCase.execute();
			res.statusCode = 200;
			res.json({ status: 'success', results: tours.length, data: { tours } });
		} catch (err) {
			res.status(500).send({ message: 'Error get' });
		}
	});

	router.get('/:id', async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const tour = await getOneToursUseCase.execute(id);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(500).send({ message: 'Error get one' });
		}
	});

	router.post('/', validateBody, async (req: Request, res: Response): Promise<void> => {
		try {
			const { body } = req;
			const tour = await createTourUseCase.execute(body);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(500).send({ message: 'Error post' });
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
			res.status(500).send({ message: 'Error patch' });
		}
	});

	router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const tour = await deleteTourUseCase.execute(id);
			res.statusCode = 200;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			res.status(500).send({ message: 'Error delete' });
		}
	});

	return router;
}
