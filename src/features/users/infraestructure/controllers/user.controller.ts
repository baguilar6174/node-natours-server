import { Request, Response, NextFunction, Router } from 'express';
import { RequestQuery } from '../../../../core/types';
import { UserService } from '../../application/services/user.service';
import { HttpCode } from '../../../../core/constants';
import { AppError } from '../../../../core/error/app-error';

export default function UserController(service: UserService): Router {
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
			const tour = await service.getOne(id);
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

	router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { body } = req;
			const tour = await service.create(body);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			next(err);
		}
	});

	router.patch('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const {
				params: { id },
				body
			} = req;
			const tour = await service.update(id, body);
			if (!tour) {
				throw new AppError({
					message: `No tour found with id ${id}`,
					statusCode: HttpCode.NOT_FOUND
				});
			}
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			next(err);
		}
	});

	router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { id } = req.params;
			const tour = await service.deleteOne(id);
			if (!tour) {
				throw new AppError({
					message: `No tour found with id ${id}`,
					statusCode: HttpCode.NOT_FOUND
				});
			}
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: tour });
		} catch (err) {
			next(err);
		}
	});

	return router;
}
