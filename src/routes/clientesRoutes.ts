import { Router, Request, Response } from 'express';
import {
  getClientes,
  getClientesById,
  createClientes,
  updateClientes,
  deleteClientes,
} from '../controllers/clientesControllers';
import { asyncHandler } from '../middlewares/asyncHandler';
import verificarToken from '../middlewares/jwtHandler';

const router: Router = Router();

router.get('/clientes',verificarToken, asyncHandler(getClientes));

router.get('/clientes/:id',verificarToken, asyncHandler(getClientesById));

router.post('/clientes',verificarToken, asyncHandler(createClientes));

router.put('/clientes/:id',verificarToken, asyncHandler(updateClientes));

router.delete('/clientes/:id',verificarToken, asyncHandler(deleteClientes));

export default router;
