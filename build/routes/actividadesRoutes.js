"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadesControllers_1 = require("../controllers/actividadesControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const router = (0, express_1.Router)();
router.get('/actividades', (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.getActividades));
router.get('/actividades/:id', (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.getActividadesById));
router.post('/actividades', (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.createActividades));
router.put('/actividades/:id', (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.updateActividades));
router.delete('/actividades/:id', (0, asyncHandler_1.asyncHandler)(actividadesControllers_1.deleteActividades));
exports.default = router;
