import { Router } from 'express';

import { toursRouter } from './features/tours/presentation/dependencies';
import { TOURS_ENDPOINT, USERS_ENDPOINT } from './core/constants';
import { userController } from './features/users/infraestructure/config/app-config';

const router = Router();

router.use(TOURS_ENDPOINT, toursRouter);
router.use(USERS_ENDPOINT, userController);

export default router;
