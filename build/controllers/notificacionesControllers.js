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
exports.eliminarNotificacion = exports.marcarNotificacionComoLeidaController = exports.crearNotificacionController = exports.obtenerNotificacionesController = void 0;
const notificacionesService_1 = require("../services/notificacionesService");
const notificaionesRepository_1 = require("../repositories/notificaionesRepository");
// notificaciones.controller.ts
const obtenerNotificacionesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.params.id;
    console.log('usuarioId:', usuarioId);
    const notificaciones = yield (0, notificacionesService_1.obtenerNotificaciones)(usuarioId);
    res.json(notificaciones);
});
exports.obtenerNotificacionesController = obtenerNotificacionesController;
const crearNotificacionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.body.vendedor_id;
    yield (0, notificacionesService_1.crearNotificacion)(req.body)(usuarioId, req.body.descripcion, req.body.tipo);
    res.status(201).send();
});
exports.crearNotificacionController = crearNotificacionController;
const marcarNotificacionComoLeidaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, notificaionesRepository_1.marcarNotificacionComoLeida)(req.params.id);
    res.status(204).send();
});
exports.marcarNotificacionComoLeidaController = marcarNotificacionComoLeidaController;
const eliminarNotificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, notificacionesService_1.eliminarNotificacionService)(req.params.id);
    res.status(204).send();
});
exports.eliminarNotificacion = eliminarNotificacion;
