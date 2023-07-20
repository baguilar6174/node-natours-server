import { Router } from 'express';

import { TOURS_ENDPOINT, USERS_ENDPOINT } from './core/constants';
import { userController } from './features/users/infraestructure/config/user.config';
import { toursController } from './features/tours/infraestructure/config/tour.config';

const router = Router();

router.use(TOURS_ENDPOINT, toursController);
router.use(USERS_ENDPOINT, userController);

export default router;
