import { Request, Response, NextFunction, Router } from 'express';
import { RequestQuery } from '../../../../core/types';
import { ReviewService } from '../../application';
import { HttpCode, Roles } from '../../../../core/constants';
import { protect, restrictTo } from '../../../users/application/middlewares';

export default function ReviewController(service: ReviewService): Router {
	const router = Router();

	router.get(
		'/',
		async (req: Request<object, object, object, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { page, limit, sort, fields, ...query } = req.query;
				const pagination = { page, limit };
				const results = await service.getAll({ query, sort, fields, pagination });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', results: results.length, data: { results } });
			} catch (err) {
				next(err);
			}
		}
	);

	router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { id } = req.params;
			const result = await service.getOne(id);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (error) {
			next(error);
		}
	});

	router.post(
		'/',
		protect,
		restrictTo(Roles.USER),
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { body } = req;
				const result = await service.create(body);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	router.patch('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const {
				params: { id },
				body
			} = req;
			const result = await service.update(id, body);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { id } = req.params;
			const result = await service.delete(id);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	return router;
}
