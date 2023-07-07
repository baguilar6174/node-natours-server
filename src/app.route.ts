import { Router } from 'express';

import usersRouter from './modules/users/users.routes';
import toursRouter from './modules/tours/tours.routes';

const router = Router();

router.use('/tours', toursRouter);
router.use('/users', usersRouter);

export default router;
