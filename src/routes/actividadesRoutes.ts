import { Router, Request, Response } from 'express';
import {
  getActividades,
  getActividadesById,
  createActividades,
  updateActividades,
  deleteActividades,
} from '../controllers/actividadesControllers';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/actividades', asyncHandler(getActividades));

router.get('/actividades/:id', asyncHandler(getActividadesById));

router.post('/actividades', asyncHandler(createActividades));

router.put('/actividades/:id', asyncHandler(updateActividades));

router.delete('/actividades/:id', asyncHandler(deleteActividades));

export default router;
