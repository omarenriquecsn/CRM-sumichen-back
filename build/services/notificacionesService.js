"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarNotificacionService = exports.marcarNotificacionComoLeidaService = exports.obtenerNotificaciones = exports.crearNotificacion = void 0;
const notificaionesRepository_1 = require("../repositories/notificaionesRepository");
const crearNotificacion = (notificacion) => (usuarioId, descripcion, tipo) => {
    // Llama al repositorio para guardar la notificación
    return (0, notificaionesRepository_1.crearNotificacionRepository)({ vendedor_id: usuarioId, descripcion: descripcion, tipo: tipo });
};
exports.crearNotificacion = crearNotificacion;
const obtenerNotificaciones = (usuarioId) => {
    // Llama al repositorio para traer las notificaciones del usuario
    return (0, notificaionesRepository_1.obtenerNotificacionesPorUsuario)(usuarioId);
};
exports.obtenerNotificaciones = obtenerNotificaciones;
const marcarNotificacionComoLeidaService = (id) => {
    return (0, notificaionesRepository_1.marcarNotificacionComoLeida)(id);
};
exports.marcarNotificacionComoLeidaService = marcarNotificacionComoLeidaService;
const eliminarNotificacionService = (id) => {
    return (0, notificaionesRepository_1.eliminarNotificacion)(id);
};
exports.eliminarNotificacionService = eliminarNotificacionService;
