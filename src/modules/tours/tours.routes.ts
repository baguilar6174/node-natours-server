import { NextFunction, Request, Response, Router } from 'express';
import * as toursController from './tours.controller';

const toursRouter = Router();

// Middleware to validate correct id before action
toursRouter.param('id', (_: Request, res: Response, next: NextFunction, id: string): Response | void => {
	const tours = toursController.getAll();
	if (Number(id) > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid id'
		});
	}
	return next();
});

toursRouter.get('/', (_: Request, res: Response): Response => {
	const results = toursController.getAll();
	return res.status(200).json({
		status: 'success',
		// requestAt: req.requestTime,
		results: results.length,
		data: { tours: results }
	});
});

toursRouter.get('/:id', (req: Request, res: Response): Response => {
	const { id } = req.params;
	const result = toursController.getById(+id);
	return res.status(200).json({
		status: 'success',
		data: result
	});
});

toursRouter.post('/', async (req: Request, res: Response) => {
	const result = await toursController.create(req.body);
	return res.status(201).json({
		status: 'success',
		data: { result }
	});
});

toursRouter.patch('/:id', (req: Request, res: Response): Response => {
	const { id } = req.params;
	const result = toursController.update(+id, req.body);
	return res.status(200).json({
		status: 'success',
		data: result
	});
});

toursRouter.delete('/:id', (req: Request, res: Response): Response => {
	const { id } = req.params;
	const result = toursController.deleteById(+id);
	return res.status(204).json({
		status: 'success',
		data: result
	});
});

export default toursRouter;
