import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import { getArchivos } from '../controllers/archivosControllers';
import verificarToken from '../middlewares/jwtHandler';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/uploads/:fileName', verificarToken, asyncHandler(getArchivos));

export default router;
