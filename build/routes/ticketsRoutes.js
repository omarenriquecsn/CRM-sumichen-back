"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketsControllers_1 = require("../controllers/ticketsControllers");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const jwtHandler_1 = __importDefault(require("../middlewares/jwtHandler"));
const router = (0, express_1.Router)();
router.get('/tickets', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(ticketsControllers_1.getTickets));
router.get('/tickets/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(ticketsControllers_1.getTicketsByVendedor));
router.post('/tickets', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(ticketsControllers_1.createTicket));
router.put('/tickets/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(ticketsControllers_1.updateTicket));
router.delete('/tickets/:id', jwtHandler_1.default, (0, asyncHandler_1.asyncHandler)(ticketsControllers_1.deleteTicket));
exports.default = router;
