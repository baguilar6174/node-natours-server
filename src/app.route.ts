import { Router } from 'express';
import { toursRouter } from './features/tours/presentation/dependencies';
import { TOURS_ENDPOINT } from './core/constants/routes';

const router = Router();

router.use(TOURS_ENDPOINT, toursRouter);

export default router;
