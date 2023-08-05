import { Router } from 'express';

import { AUTH_ENDPOINT, BOOKINGS_ENDPOINT, REVIEWS_ENDPOINT, TOURS_ENDPOINT, USERS_ENDPOINT } from './core/constants';
import { authController, userController } from './features/users/infraestructure';
import { bookingsController, reviewsController, toursController } from './features';

const router = Router();

router.use(`/${TOURS_ENDPOINT}`, toursController);
router.use(`/${AUTH_ENDPOINT}`, authController);
router.use(`/${USERS_ENDPOINT}`, userController);
router.use(`/${REVIEWS_ENDPOINT}`, reviewsController);
router.use(`/${BOOKINGS_ENDPOINT}`, bookingsController);

export default router;
