"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reunionesControllers_1 = require("../controllers/reunionesControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const router = (0, express_1.Router)();
router.get('/reuniones', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(reunionesControllers_1.getReuniones));
router.get('/reuniones/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(reunionesControllers_1.getReunionById));
router.post('/reuniones', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(reunionesControllers_1.createReunion));
router.put('/reuniones/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(reunionesControllers_1.updateReunion));
router.delete('/reuniones/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(reunionesControllers_1.deleteReunion));
exports.default = router;
