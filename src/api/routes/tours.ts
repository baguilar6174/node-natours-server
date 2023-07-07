import { Request, Response, Router } from 'express';
import * as toursController from '../controllers/tours';

const toursRouter = Router();

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
	if (!result) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid id'
		});
	}
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
	const tours = toursController.getAll();
	const result = toursController.update(+id, req.body);

	if (Number(id) > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid id'
		});
	}

	return res.status(200).json({
		status: 'success',
		data: result
	});
});

toursRouter.delete('/:id', (req: Request, res: Response): Response => {
	const { id } = req.params;
	const tours = toursController.getAll();
	const result = toursController.deleteById(+id);

	if (Number(id) > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid id'
		});
	}

	return res.status(204).json({
		status: 'success',
		data: result
	});
});

export default toursRouter;
