import { Request, Response, NextFunction, Router } from 'express';
import { HttpCode, USERS_ENDPOINT } from '../../../../core/constants';
import { AuthService } from '../../application/services/auth.service';
import EnvConfig from '../../../../core/env.config';
import { protect } from '../../application/middlewares';
import { User } from '../../domain/entities/user.entity';

declare module 'express-serve-static-core' {
	interface Request {
		user: User;
	}
}

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

	router.post('/forgotPassword', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { body } = req;
			const resetURL = `${req.protocol}://${req.get('host')}${EnvConfig.API_PREFIX}${USERS_ENDPOINT}/resetPassword`;
			const result = await service.forgotPassword(body, resetURL);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	router.patch('/resetPassword/:token', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { token } = req.params;
			const { body } = req;
			const result = await service.resetPassword(token, body.password);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	router.patch('/updatePassword', protect, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { user, body } = req;
			const { currentPassword, password, passwordConfirm } = body;
			const result = await service.updatePassword(user._id, currentPassword, password, passwordConfirm);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	router.patch('/updateUserData', protect, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { user, body } = req;
			const { password, passwordConfirm, name, email } = body;
			const result = await service.updateUserData(user._id, password, passwordConfirm, { name, email });
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	router.delete('/deleteAccount', protect, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { user } = req;
			const result = await service.deleteAccount(user._id);
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	return router;
}
