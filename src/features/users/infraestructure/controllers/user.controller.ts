import { Request, Response, NextFunction, Router } from 'express';
import { RequestQuery } from '../../../../core/types';
import { UserService } from '../../application/services/user.service';
import { HttpCode, Roles } from '../../../../core/constants';
import { protect, restrictTo } from '../../application/middlewares';

export default function UserController(service: UserService): Router {
	const router = Router();

	router.get(
		'/',
		protect<RequestQuery>,
		restrictTo(Roles.ADMIN),
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

	router.get(
		'/:id',
		protect,
		restrictTo(Roles.ADMIN),
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { id } = req.params;
				const tour = await service.getOne(id);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: tour });
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
}
