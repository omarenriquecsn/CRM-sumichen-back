"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidosControllers_1 = require("../controllers/pedidosControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const router = (0, express_1.Router)();
router.get('/pedidos', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(pedidosControllers_1.getPedidos));
router.get('/pedidos/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(pedidosControllers_1.getPedidosByVendedor));
router.post('/pedidos', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(pedidosControllers_1.createPedido));
router.post('/pedidos/:id/evidencia', jwtHandler_1.default, ...pedidosControllers_1.subirEvidencia);
router.put('/pedidos/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(pedidosControllers_1.updatePedido));
router.delete('/pedidos/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(pedidosControllers_1.deletePedido));
exports.default = router;
