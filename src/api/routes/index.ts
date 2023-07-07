import { Router } from 'express';
import toursRouter from './tours';

const router = Router();

router.use('/tours', toursRouter);

export default router;
