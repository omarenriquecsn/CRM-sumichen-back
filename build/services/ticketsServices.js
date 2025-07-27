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
exports.deleteTicketsService = exports.updateTicketsService = exports.createTicketsService = exports.getTicketsByIdService = exports.getTicketsByVendedorService = exports.getTicketsService = void 0;
const ActividadesEnum_1 = require("../enums/ActividadesEnum");
const ticketsRepository_1 = require("../repositories/ticketsRepository");
const usuariosRepository_1 = require("../repositories/usuariosRepository");
const ApiError_1 = require("../utils/ApiError");
const actividadesServices_1 = require("./actividadesServices");
const getTicketsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield (0, ticketsRepository_1.getTickets)();
    return tickets;
});
exports.getTicketsService = getTicketsService;
const getTicketsByVendedorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield (0, ticketsRepository_1.getTickets)();
    return tickets.filter((ticket) => ticket.vendedor_id === id);
});
exports.getTicketsByVendedorService = getTicketsByVendedorService;
const getTicketsByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield (0, ticketsRepository_1.getTicketById)(id);
    return ticket;
});
exports.getTicketsByIdService = getTicketsByIdService;
const createTicketsService = (ticketData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ticketData.vendedor_id)
        throw new ApiError_1.ApiError('El ticket debe tener el id del vendedor');
    console.log(ticketData.vendedor_id);
    const vendedor = yield (0, usuariosRepository_1.getUsuarioByIdDb)(ticketData.vendedor_id);
    if (!vendedor)
        throw new ApiError_1.ApiError('El vendedor no existe');
    ticketData.numero = yield (0, ticketsRepository_1.generarNumero)();
    const newTicket = yield (0, ticketsRepository_1.createTicket)(ticketData);
    const newActividad = {
        titulo: newTicket.titulo,
        tipo: ActividadesEnum_1.ActividadesEnum.TAREA,
        descripcion: newTicket.descripcion,
        fecha: new Date(),
        vendedor_id: newTicket.vendedor_id,
        cliente_id: newTicket.cliente_id,
    };
    yield (0, actividadesServices_1.createActividadesService)(newActividad);
    return {
        message: 'Ticket creado',
        data: newTicket,
    };
});
exports.createTicketsService = createTicketsService;
const updateTicketsService = (id, ticketData) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketActualizado = yield (0, ticketsRepository_1.updateTicket)(id, ticketData);
    if (!ticketActualizado)
        throw new ApiError_1.ApiError('No se pudo actualizar el ticket');
    if (ticketActualizado.estado === 'cerrado' ||
        ticketActualizado.estado === 'resuelto') {
        const actividades = yield (0, actividadesServices_1.getActividadesByIdService)(ticketActualizado.vendedor_id);
        const actividadActualizada = actividades.find((actividad) => actividad.cliente_id === ticketActualizado.cliente_id &&
            actividad.titulo === ticketActualizado.titulo &&
            actividad.descripcion === ticketActualizado.descripcion &&
            new Date(actividad.fecha_creacion).getDate() ===
                new Date(ticketActualizado.fecha_creacion).getDate());
        if (!actividadActualizada)
            throw new Error('No se pudo actualizar la actividad');
        yield (0, actividadesServices_1.updateActividadesService)(actividadActualizada.id, {
            completado: true,
        });
    }
    return {
        message: 'Ticket actualizado',
        data: ticketActualizado,
    };
});
exports.updateTicketsService = updateTicketsService;
const deleteTicketsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ticketsRepository_1.deleteTicket)(id);
    return {
        message: 'Ticket cerrado',
    };
});
exports.deleteTicketsService = deleteTicketsService;
