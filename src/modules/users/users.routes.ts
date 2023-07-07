import { NextFunction, Request, Response, Router } from 'express';

const usersRouter = Router();

// * Middleware to get params in request
usersRouter.param('id', (_: Request, __: Response, next: NextFunction, id: string) => {
	console.log({ id });
	next();
});

usersRouter.get('/', (_: Request, res: Response): Response => {
	return res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
});

usersRouter.get('/:id', (_: Request, res: Response): Response => {
	return res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
});

usersRouter.post('/', async (_: Request, res: Response) => {
	return res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
});

usersRouter.patch('/:id', (_: Request, res: Response): Response => {
	return res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
});

usersRouter.delete('/:id', (_: Request, res: Response): Response => {
	return res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined'
	});
});

export default usersRouter;
