import { Router } from 'express';
import actividadesRoutes from './actividadesRoutes';
import clientesRoutes from './clientesRoutes';
import metasRoutes from './metasRoutes';
import oportunidadesRoutes from './oportunidadesRoutes';
import pedidosRoutes from './pedidosRoutes';
import productosRoutes from './productosRoutes';
import productos_pedidoRoutes from './productos_pedidoRoutes';
import reunionesRoutes from './reunionesRoutes';
import ticketsRoutes from './ticketsRoutes';
import usuariosRoutes from './usuariosRoutes';
import descargasRoutes from './descargasRoutes';

// import turnRoutes from "./turnRoutes"
const router: Router = Router();

router.use('/', actividadesRoutes);
router.use('/', clientesRoutes);
router.use('/', metasRoutes);
router.use('/', oportunidadesRoutes);
router.use('/', pedidosRoutes);
router.use('/', productosRoutes);
router.use('/', productos_pedidoRoutes);
router.use('/', reunionesRoutes);
router.use('/', ticketsRoutes);
router.use('/', usuariosRoutes);
router.use('/', descargasRoutes);

export default router;
