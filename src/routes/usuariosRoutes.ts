import { Router, Request, Response } from 'express';
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuariosControllers';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/usuarios', asyncHandler(getUsuarios));

router.get('/usuarios/:id', asyncHandler(getUsuarioById));

router.post('/usuarios', asyncHandler(createUsuario));

router.put('/usuarios/:id', asyncHandler(updateUsuario));

router.delete('/usuarios/:id', asyncHandler(deleteUsuario));

export default router;
