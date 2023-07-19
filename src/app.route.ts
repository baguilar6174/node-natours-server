import { NextFunction, Request, Response, Router } from 'express';

import { toursRouter } from './features/tours/presentation/dependencies';
import { AppError, handleGlobalErrors } from './core/error/app-error';
import { HttpCode, TOURS_ENDPOINT } from './core/constants';

const router = Router();

router.use(TOURS_ENDPOINT, toursRouter);

// Handle not found routes
router.all('*', (req: Request, _: Response, next: NextFunction): void => {
	next(
		new AppError({
			message: `Cant find ${req.originalUrl} on this server!`,
			statusCode: HttpCode.NOT_FOUND
		})
	);
});

// Middleware to handle errors
router.use(handleGlobalErrors);

export default router;
