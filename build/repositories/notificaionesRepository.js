"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarNotificacion = exports.marcarNotificacionComoLeida = exports.obtenerNotificacionesPorUsuario = exports.crearNotificacionRepository = void 0;
const Notificaiones_1 = require("../entities/Notificaiones");
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const NotificacionRepository = dataBaseConfig_1.AppDataSource.getRepository(Notificaiones_1.Notificacion);
const crearNotificacionRepository = (notificacion) => __awaiter(void 0, void 0, void 0, function* () {
    return yield NotificacionRepository.save(notificacion);
});
exports.crearNotificacionRepository = crearNotificacionRepository;
const obtenerNotificacionesPorUsuario = (usuarioId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield NotificacionRepository.find({
        where: { vendedor_id: usuarioId },
        order: { fecha: 'DESC' },
    });
});
exports.obtenerNotificacionesPorUsuario = obtenerNotificacionesPorUsuario;
const marcarNotificacionComoLeida = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield NotificacionRepository.update(id, { leida: true });
});
exports.marcarNotificacionComoLeida = marcarNotificacionComoLeida;
const eliminarNotificacion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield NotificacionRepository.delete(id);
});
exports.eliminarNotificacion = eliminarNotificacion;
