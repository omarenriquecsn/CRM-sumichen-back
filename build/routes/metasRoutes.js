"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metasControllers_1 = require("../controllers/metasControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const router = (0, express_1.Router)();
router.get('/metas', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(metasControllers_1.getMetas));
router.get('/metas/:id/', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(metasControllers_1.getMetasById));
router.post('/metas', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(metasControllers_1.createMetas));
router.put('/metas/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(metasControllers_1.updateMetas));
router.delete('/metas/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(metasControllers_1.deleteMetas));
exports.default = router;
