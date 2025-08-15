"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oportunidadesControllers_1 = require("../controllers/oportunidadesControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const router = (0, express_1.Router)();
router.get('/oportunidades', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(oportunidadesControllers_1.getOportunidades));
router.get('/oportunidades/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(oportunidadesControllers_1.getOportunidadById));
router.post('/oportunidades', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(oportunidadesControllers_1.createOportunidad));
router.put('/oportunidades/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(oportunidadesControllers_1.updateOportunidad));
router.delete('/oportunidades/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(oportunidadesControllers_1.deleteOportunidad));
exports.default = router;
