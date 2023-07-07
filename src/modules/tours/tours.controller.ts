import { NextFunction, Request, Response } from 'express';

import toursService from './tours.service';

const checkId = (_: Request, res: Response, next: NextFunction, id: string): Response | void => {
	const tours = toursService.getAll();
	if (Number(id) > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid id'
		});
	}
	return next();
};

const getAll = (_: Request, res: Response): Response => {
	try {
		const tours = toursService.getAll();
		return res.status(200).json({
			status: 'success',
			results: tours.length,
			data: { tours }
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 'error',
			message: 'Error in getAll'
		});
	}
};

const getById = (req: Request, res: Response): Response => {
	try {
		const { id } = req.params;
		const tour = toursService.getById(+id);
		return res.status(200).json({
			status: 'success',
			data: tour
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 'error',
			message: 'Error in getById'
		});
	}
};

const create = (req: Request, res: Response): Response => {
	try {
		const { body } = req;
		const tour = toursService.create(body);
		return res.status(200).json({
			status: 'success',
			data: tour
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 'error',
			message: 'Error in create'
		});
	}
};

const update = (req: Request, res: Response): Response => {
	try {
		const {
			params: { id },
			body
		} = req;
		const tour = toursService.update(+id, body);
		return res.status(200).json({
			status: 'success',
			data: tour
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 'error',
			message: 'Error in update'
		});
	}
};

const deleteById = (req: Request, res: Response): Response => {
	try {
		const {
			params: { id }
		} = req;
		const tourId = toursService.deleteById(+id);
		return res.status(200).json({
			status: 'success',
			data: `Tour ${tourId} deleted`
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 'error',
			message: 'Error in deleteById'
		});
	}
};

export { checkId, getAll, getById, create, update, deleteById };
