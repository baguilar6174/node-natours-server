import { Router } from 'express';

import { AUTH_ENDPOINT, TOURS_ENDPOINT, USERS_ENDPOINT } from './core/constants';
import { authController, userController } from './features/users/infraestructure/config/user.config';
import { toursController } from './features/tours/infraestructure/config/tour.config';

const router = Router();

router.use(TOURS_ENDPOINT, toursController);
router.use(AUTH_ENDPOINT, authController);
router.use(USERS_ENDPOINT, userController);

export default router;
