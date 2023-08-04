import { Request, Response, NextFunction, Router } from 'express';
import { RequestQuery } from '../../../../core/types';
import { HttpCode, REVIEWS_ENDPOINT, Roles } from '../../../../core/constants';
import { TourService } from '../../application';
import { protect, restrictTo } from '../../../users/application/middlewares';
import { reviewsController } from '../../../reviews';

export default function TourController(service: TourService): Router {
	const router = Router();

	// Nested review controller
	router.use(`/:tourId/${REVIEWS_ENDPOINT}`, reviewsController);

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
	router.get('/seed', async (_: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const result = await service.seed();
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', message: result });
		} catch (err) {
			next(err);
		}
	});

	router.get('/stats', async (_: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const stats = await service.getStats();
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: { stats } });
		} catch (err) {
			next(err);
		}
	});

	router.get(
		'/monthly-plan/:year',
		protect,
		restrictTo(Roles.ADMIN, Roles.LEAD_GUIDE, Roles.GUIDE),
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { year } = req.params;
				const plan = await service.getMonthlyPlan(Number(year));
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: { plan } });
			} catch (err) {
				next(err);
			}
		}
	);

	router.get(
		'/within/:distance/center/:latlng/unit/:unit',
		async (
			req: Request<{ distance: number; latlng: string; unit: string }>,
			res: Response,
			next: NextFunction
		): Promise<void> => {
			try {
				const { latlng, ...rest } = req.params;
				const [lat, lng] = latlng.split(',').map(Number);
				const result = await service.getCloserTours({ center: { lat, lng }, ...rest });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', results: result.length, data: { result } });
			} catch (err) {
				next(err);
			}
		}
	);

	router.get(
		'/distances/:latlng/unit/:unit',
		async (req: Request<{ latlng: string; unit: string }>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { latlng, ...rest } = req.params;
				const [lat, lng] = latlng.split(',').map(Number);
				const result = await service.getDistances({ center: { lat, lng }, ...rest });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', results: result.length, data: { result } });
			} catch (err) {
				next(err);
			}
		}
	);

	router.get(
		'/',
		async (req: Request<object, object, object, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { page, limit, sort, fields, ...query } = req.query;
				const pagination = { page, limit };
				const tours = await service.getAll({ query, sort, fields, pagination });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', results: tours.length, data: { tours } });
			} catch (err) {
				next(err);
			}
		}
	);

	router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { id } = req.params;
			const tour = await service.getOne(id);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: tour });
		} catch (error) {
			next(error);
		}
	});

	router.post(
		'/',
		protect,
		restrictTo(Roles.ADMIN, Roles.LEAD_GUIDE),
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { body } = req;
				const tour = await service.create(body);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: tour });
			} catch (err) {
				next(err);
			}
		}
	);

	router.patch(
		'/:id',
		protect,
		restrictTo(Roles.ADMIN, Roles.LEAD_GUIDE),
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				const {
					params: { id },
					body
				} = req;
				const tour = await service.update(id, body);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: tour });
			} catch (err) {
				next(err);
			}
		}
	);

	router.delete(
		'/:id',
		protect,
		restrictTo(Roles.ADMIN, Roles.LEAD_GUIDE),
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { id } = req.params;
				const tour = await service.delete(id);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: tour });
			} catch (err) {
				next(err);
			}
		}
	);

	return router;
}
