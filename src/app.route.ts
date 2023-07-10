import { Router } from 'express';

import { toursRouter } from '@presentation/tours/dependencies';

const router = Router();

router.use('/tours', toursRouter);

export default router;
