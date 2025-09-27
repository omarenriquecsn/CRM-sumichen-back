"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const descargasControllers_1 = require("../controllers/descargasControllers");
const router = (0, express_1.Router)();
router.get('/descargas/pedidos', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(descargasControllers_1.getDescargasPedidos));
router.get('/descargas/clientes', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(descargasControllers_1.getDescargasClientes));
router.get('/descargas/reuniones', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(descargasControllers_1.getDescargasReuniones));
router.get('/descargas/actividades', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(descargasControllers_1.getDescargasActividades));
router.get('/descargas/metas', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(descargasControllers_1.getDescargasMetas));
exports.default = router;
