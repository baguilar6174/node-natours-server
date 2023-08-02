import { Router } from 'express';

import { AUTH_ENDPOINT, REVIEWS_ENDPOINT, TOURS_ENDPOINT, USERS_ENDPOINT } from './core/constants';
import { authController, userController } from './features/users/infraestructure/config/user.config';
import { toursController } from './features/tours/infraestructure/config/tour.config';
import { reviewsController } from './features/reviews/infraestructure';

const router = Router();

router.use(TOURS_ENDPOINT, toursController);
router.use(AUTH_ENDPOINT, authController);
router.use(USERS_ENDPOINT, userController);
router.use(REVIEWS_ENDPOINT, reviewsController);

export default router;
