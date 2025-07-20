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
