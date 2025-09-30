import { crearNotificacionController, eliminarNotificacion, marcarNotificacionComoLeidaController, obtenerNotificacionesController } from "../controllers/notificacionesControllers";
import { asyncHandler } from "../middlewares/asyncHandler";
import verificarToken from "../middlewares/jwtHandler";
import router from "./actividadesRoutes";

router.get('/notificaciones/:id', verificarToken, asyncHandler(obtenerNotificacionesController));

router.post('/notificaciones', verificarToken, asyncHandler(crearNotificacionController));

router.patch('/notificaciones/:id/leida', verificarToken, asyncHandler(marcarNotificacionComoLeidaController));

router.delete('/notificaciones/:id', verificarToken, asyncHandler(eliminarNotificacion));

export default router;