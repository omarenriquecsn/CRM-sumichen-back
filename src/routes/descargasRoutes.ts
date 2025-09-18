import { Router } from 'express';

import { asyncHandler } from '../middlewares/asyncHandler';
import verificarToken from '../middlewares/jwtHandler';
import { getDescargasPedidos } from '../controllers/descargasControllers';

const router: Router = Router();

router.get('/descargas/pedidos', verificarToken, asyncHandler(getDescargasPedidos));

export default router;
