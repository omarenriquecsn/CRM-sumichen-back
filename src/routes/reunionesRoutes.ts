import { Router, Request, Response } from 'express';
import {
  getReuniones,
  // getReunionById,
  getReunionesByVendedor,
  createReunion,
  updateReunion,
  deleteReunion,
} from '../controllers/reunionesControllers';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/reuniones', asyncHandler(getReuniones));

router.get('/reuniones/:id', asyncHandler(getReunionesByVendedor));

router.post('/reuniones', asyncHandler(createReunion));

router.put('/reuniones/:id', asyncHandler(updateReunion));

router.delete('/reuniones/:id', asyncHandler(deleteReunion));

export default router;
