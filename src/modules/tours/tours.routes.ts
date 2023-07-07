import { Router } from 'express';
import { checkId, getAll, getById, create, update, deleteById } from './tours.controller';

const toursRouter = Router();

// Middlewares
toursRouter.param('id', checkId);

// Routes
toursRouter.get('/', getAll);
toursRouter.get('/:id', getById);
toursRouter.post('/', create);
toursRouter.patch('/:id', update);
toursRouter.delete('/:id', deleteById);

export default toursRouter;
