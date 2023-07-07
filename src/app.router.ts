import { Router } from 'express';
import toursRouter from './modules/tours/tours.routes';
import usersRouter from './modules/users/users.routes';

const router = Router();

router.use('/tours', toursRouter);
router.use('/users', usersRouter);

export default router;
