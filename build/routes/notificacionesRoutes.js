"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notificacionesControllers_1 = require("../controllers/notificacionesControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const actividadesRoutes_1 = __importDefault(require("./actividadesRoutes"));
actividadesRoutes_1.default.get('/notificaciones/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(notificacionesControllers_1.obtenerNotificacionesController));
actividadesRoutes_1.default.post('/notificaciones', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(notificacionesControllers_1.crearNotificacionController));
actividadesRoutes_1.default.patch('/notificaciones/:id/leida', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(notificacionesControllers_1.marcarNotificacionComoLeidaController));
actividadesRoutes_1.default.delete('/notificaciones/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(notificacionesControllers_1.eliminarNotificacion));
exports.default = actividadesRoutes_1.default;
