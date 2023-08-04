import { Request, Response, NextFunction, Router } from 'express';
import { RequestQuery } from '../../../../core/types';
import { HttpCode, Roles } from '../../../../core/constants';
import { protect, restrictTo } from '../../../users/application/middlewares';
import { BookingService } from '../../application';

export default function BookingController(service: BookingService): Router {
	const router = Router();

	// TODO: implements get bookings from a user using query
	// TODO: implement restriction that users can only review a tour that thy have actually booked
	router.get(
		'/',
		protect,
		restrictTo(Roles.ADMIN),
		async (req: Request<object, object, object, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { page, limit, sort, fields, ...rest } = req.query;
				const pagination = { page, limit };
				const filter = { ...rest };

				// const filter = { user: req.user._id, ...rest };

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

	// TODO: implements nested booking routes /tours/:id/bookings and /users/:id/bookings
	router.post(
		'/',
		protect,
		restrictTo(Roles.USER),
		async (
			req: Request<object, object, { price: number; tour: string }>,
			res: Response,
			next: NextFunction
		): Promise<void> => {
			try {
				const { body, user } = req;
				const result = await service.create({ user: user._id, ...body });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	return router;
}
