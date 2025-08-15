"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadesControllers_1 = require("../controllers/actividadesControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const router = (0, express_1.Router)();
router.get('/actividades', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.getActividades));
router.get('/actividades/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.getActividadesById));
router.post('/actividades', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.createActividades));
router.put('/actividades/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.updateActividades));
router.delete('/actividades/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.deleteActividades));
exports.default = router;
