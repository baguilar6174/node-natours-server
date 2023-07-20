import { Router, Request, Response, NextFunction } from 'express';
import { RequestQuery } from '../../../../core/types';
import { UserService } from '../../application/services/user.service';
import { HttpCode } from '../../../../core/constants';
import { AppError } from '../../../../core/error/app-error';

export default function UserController(useService: UserService): Router {
	const router = Router();

	router.get(
		'/',
		async (req: Request<object, object, object, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { page, limit, sort, fields, ...query } = req.query;
				const pagination = { page, limit };
				const tours = await useService.getAll({ query, sort, fields, pagination });
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
			const tour = await useService.getOne(id);
			if (!tour) {
				throw new AppError({
					message: `No tour found with id ${id}`,
					statusCode: HttpCode.NOT_FOUND
				});
			}
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: tour });
		} catch (error) {
			next(error);
		}
	});

	return router;
}
