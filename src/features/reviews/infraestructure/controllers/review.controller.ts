import { Request, Response, NextFunction, Router } from 'express';
import { RequestQuery } from '../../../../core/types';
import { ReviewService } from '../../application';
import { HttpCode, Roles } from '../../../../core/constants';
import { protect, restrictTo } from '../../../users/application/middlewares';

export default function ReviewController(service: ReviewService): Router {
	const router = Router({ mergeParams: true });
	// With mergeParams enabled, I can bring params from the parent router

	router.get(
		'/',
		protect,
		async (
			req: Request<{ tourId?: string }, object, object, RequestQuery>,
			res: Response,
			next: NextFunction
		): Promise<void> => {
			try {
				const {
					params: { tourId },
					query
				} = req;
				const { page, limit, sort, fields, ...rest } = query;
				const pagination = { page, limit };

				let filter = { ...rest };
				// If tourId exist in request filter reviews from that tour
				if (tourId) filter = { tour: tourId, ...rest };

				const results = await service.getAll({ query: filter, sort, fields, pagination });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', results: results.length, data: { results } });
			} catch (err) {
				next(err);
			}
		}
	);

	router.get(
		'/:id',
		protect,
		async (req: Request<{ id: string }, object, object>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { id } = req.params;
				const result = await service.getOne(id);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (error) {
				next(error);
			}
		}
	);

	router.post(
		'/',
		protect,
		restrictTo(Roles.USER),
		async (
			req: Request<{ tourId: string }, object, { review: string; rating: number }>,
			res: Response,
			next: NextFunction
		): Promise<void> => {
			try {
				const {
					params: { tourId },
					body,
					user
				} = req;
				const result = await service.create({ tour: tourId, user: user._id, ...body });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	router.patch(
		'/:id',
		protect,
		restrictTo(Roles.USER, Roles.ADMIN),
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
		}
	);

	router.delete(
		'/:id',
		protect,
		restrictTo(Roles.USER, Roles.ADMIN),
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { id } = req.params;
				const result = await service.delete(id);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	return router;
}
