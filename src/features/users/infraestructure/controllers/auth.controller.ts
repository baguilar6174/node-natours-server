import { Request, Response, NextFunction, Router } from 'express';
import { HttpCode } from '../../../../core/constants';
import { AuthService } from '../../application/services/auth.service';

export default function AuthController(service: AuthService): Router {
	const router = Router();

	router.post('/signup', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { body } = req;
			const result = await service.signup(body);
			res.statusCode = HttpCode.CREATED;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { body } = req;
			const result = await service.login(body);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	return router;
}
