"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketsByVendedor = exports.getTicketById = exports.getTickets = void 0;
const ticketsServices_1 = require("../services/ticketsServices");
const ApiError_1 = require("../utils/ApiError");
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield (0, ticketsServices_1.getTicketsService)();
    if (tickets.length === 0)
        throw new ApiError_1.ApiError('No hay tickets disponibles');
    res.json(tickets);
});
exports.getTickets = getTickets;
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ticket = yield (0, ticketsServices_1.getTicketsByIdService)(id);
    if (!ticket)
        throw new ApiError_1.ApiError('Ticket no encontrado', 404);
    res.json(ticket);
});
exports.getTicketById = getTicketById;
const getTicketsByVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rol } = req.user.user_metadata;
    console.log(rol);
    const tickets = yield (0, ticketsServices_1.getTicketsByVendedorService)(id, rol);
    if (tickets.length === 0)
        throw new ApiError_1.ApiError('No hay tickets disponibles');
    res.json(tickets);
});
exports.getTicketsByVendedor = getTicketsByVendedor;
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const nuevoTicket = yield (0, ticketsServices_1.createTicketsService)(req.body);
    if (!nuevoTicket)
        throw new ApiError_1.ApiError('No se pudo crear el ticket', 400);
    res.status(201).json(nuevoTicket);
});
exports.createTicket = createTicket;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rol } = req.user.user_metadata;
    console.log(rol, 'update');
    const actualizado = yield (0, ticketsServices_1.updateTicketsService)(id, req.body, rol);
    if (!actualizado)
        throw new ApiError_1.ApiError('No se pudo actualizar el ticket', 400);
    res.json(actualizado);
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const borrado = yield (0, ticketsServices_1.deleteTicketsService)(id);
    if (!borrado)
        throw new ApiError_1.ApiError('No se pudo eliminar el ticket', 400);
    res.status(204).send();
});
exports.deleteTicket = deleteTicket;
