"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesControllers_1 = require("../controllers/clientesControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const router = (0, express_1.Router)();
router.get('/clientes', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(clientesControllers_1.getClientes));
router.get('/clientes/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(clientesControllers_1.getClientesById));
router.post('/clientes', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(clientesControllers_1.createClientes));
router.put('/clientes/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(clientesControllers_1.updateClientes));
router.delete('/clientes/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(clientesControllers_1.deleteClientes));
exports.default = router;
