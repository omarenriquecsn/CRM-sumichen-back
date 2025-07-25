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
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getTickets = void 0;
exports.generarNumero = generarNumero;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const Tickets_1 = require("../entities/Tickets");
const EstadoTicketEnum_1 = require("../enums/EstadoTicketEnum");
const getTickets = () => __awaiter(void 0, void 0, void 0, function* () {
    const ticketRepository = dataBaseConfig_1.AppDataSource.getRepository(Tickets_1.Ticket);
    return yield ticketRepository.find();
});
exports.getTickets = getTickets;
const getTicketById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketRepository = dataBaseConfig_1.AppDataSource.getRepository(Tickets_1.Ticket);
    return yield ticketRepository.find({ where: { vendedor_id: id } });
});
exports.getTicketById = getTicketById;
const createTicket = (ticketData) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketRepository = dataBaseConfig_1.AppDataSource.getRepository(Tickets_1.Ticket);
    const newTicket = ticketRepository.create(ticketData);
    return yield ticketRepository.save(newTicket);
});
exports.createTicket = createTicket;
const updateTicket = (id, ticketData) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketRepository = dataBaseConfig_1.AppDataSource.getRepository(Tickets_1.Ticket);
    yield ticketRepository.update(id, ticketData);
    return yield ticketRepository.findOneBy({ id });
});
exports.updateTicket = updateTicket;
const deleteTicket = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketRepository = dataBaseConfig_1.AppDataSource.getRepository(Tickets_1.Ticket);
    return yield ticketRepository.update(id, {
        estado: EstadoTicketEnum_1.EstadoTicketEnum.CERRADO,
    });
});
exports.deleteTicket = deleteTicket;
function generarNumero() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const repo = dataBaseConfig_1.AppDataSource.getRepository(Tickets_1.Ticket);
        const ultimo = yield repo
            .createQueryBuilder('pedido')
            .select('MAX(pedido.numero)', 'max')
            .getRawOne();
        const actual = parseInt((_b = (_a = ultimo === null || ultimo === void 0 ? void 0 : ultimo.max) === null || _a === void 0 ? void 0 : _a.split('-')[1]) !== null && _b !== void 0 ? _b : '0');
        const siguiente = actual + 1;
        return `TK-${siguiente.toString().padStart(4, '0')}`;
    });
}
