import { NextFunction, Request, Response } from 'express';

// Validate body params
export const validateBody = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.name || !req.body.price) {
		res.statusCode = 400;
		return res.json({ status: 'error', message: 'Name or price are required' });
	}
	return next();
};
