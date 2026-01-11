"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivosControllers_1 = require("../controllers/archivosControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const router = (0, express_1.Router)();
router.get('/uploads/:fileName', (0, asyncHandler_1.asyncHandler)(archivosControllers_1.getArchivos));
exports.default = router;
