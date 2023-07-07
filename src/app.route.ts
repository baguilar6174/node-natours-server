import { Router } from 'express';

import { tourMiddleWare } from './modules/tours-new/infraestructure/dependencies';

const router = Router();

router.use('/tours', tourMiddleWare);

export default router;
