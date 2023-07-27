import { Request, Response, NextFunction, Router } from 'express';
import { HttpCode, USERS_ENDPOINT } from '../../../../core/constants';
import { AuthService } from '../../application/services/auth.service';
import EnvConfig from '../../../../core/env.config';
import { protect } from '../../application/middlewares';
import { SignInDTO, SignUpDTO, UpdatePasswordDTO, UpdateUserDataDTO, User } from '../../domain/entities';

declare module 'express-serve-static-core' {
	interface Request {
		user: User;
	}
}

export default function AuthController(service: AuthService): Router {
	const router = Router();

	router.post(
		'/signup',
		async (req: Request<object, object, SignUpDTO>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { body } = req;
				const result = await service.signup(body);
				res.statusCode = HttpCode.CREATED;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	router.post(
		'/login',
		async (req: Request<object, object, SignInDTO>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { body } = req;
				const result = await service.login(body);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	router.post(
		'/forgotPassword',
		async (req: Request<object, object, Pick<User, 'email'>>, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { email } = req.body;
				const resetURL = `${req.protocol}://${req.get('host')}${EnvConfig.API_PREFIX}${USERS_ENDPOINT}/resetPassword`;
				const result = await service.forgotPassword({ email, resetURL });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	router.patch(
		'/resetPassword/:token',
		async (
			req: Request<{ token: string }, object, Pick<User, 'password'>>,
			res: Response,
			next: NextFunction
		): Promise<void> => {
			try {
				const {
					params: { token },
					body: { password }
				} = req;
				const result = await service.resetPassword({ resetToken: token, password });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	router.patch(
		'/updatePassword',
		protect,
		async (
			req: Request<object, object, Omit<UpdatePasswordDTO, '_id'>>,
			res: Response,
			next: NextFunction
		): Promise<void> => {
			try {
				const { user, body } = req;
				const result = await service.updatePassword({ _id: user._id, ...body });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	router.patch(
		'/updateUserData',
		protect,
		async (
			req: Request<object, object, Omit<UpdateUserDataDTO, '_id'>>,
			res: Response,
			next: NextFunction
		): Promise<void> => {
			try {
				const { user, body } = req;
				const result = await service.updateUserData({ _id: user._id, ...body });
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: result });
			} catch (err) {
				next(err);
			}
		}
	);

	router.delete('/deleteAccount', protect, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { user } = req;
			const result = await service.deleteAccount({ _id: user._id });
			res.statusCode = HttpCode.OK;
			res.json({ status: 'success', data: result });
		} catch (err) {
			next(err);
		}
	});

	return router;
}
