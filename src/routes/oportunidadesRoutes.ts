import { Router, Request, Response } from 'express';
import {
  getOportunidades,
  getOportunidadById,
  createOportunidad,
  updateOportunidad,
  deleteOportunidad,
} from '../controllers/oportunidadesControllers';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/oportunidades', asyncHandler(getOportunidades));

router.get('/oportunidades/:id', asyncHandler(getOportunidadById));

router.post('/oportunidades', asyncHandler(createOportunidad));

router.put('/oportunidades/:id', asyncHandler(updateOportunidad));

router.delete('/oportunidades/:id', asyncHandler(deleteOportunidad));

export default router;
