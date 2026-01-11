import { Router, Request, Response, NextFunction } from 'express';
import { getArchivos } from '../controllers/archivosControllers';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/uploads/:fileName', asyncHandler(getArchivos));

export default router;
