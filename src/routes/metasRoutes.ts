import { Router, Request, Response } from 'express';
import {
  getMetas,
  getMetasById,
  createMetas,
  updateMetas,
  deleteMetas,
} from '../controllers/metasControllers';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/metas', asyncHandler(getMetas));

router.get('/metas/:id', asyncHandler(getMetasById));

router.post('/metas', asyncHandler(createMetas));

router.put('/metas/:id', asyncHandler(updateMetas));

router.delete('/metas/:id', asyncHandler(deleteMetas));

export default router;
