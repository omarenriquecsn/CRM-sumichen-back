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
exports.deleteClientesService = exports.updateClientesService = exports.createClientesService = exports.getClientesByIdService = exports.getClientesVendedorService = exports.getClientesService = void 0;
const clientesRepository_1 = require("../repositories/clientesRepository");
const metasServices_1 = require("./metasServices");
const getClientesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield (0, clientesRepository_1.getClientes)();
    return clientes;
});
exports.getClientesService = getClientesService;
const getClientesVendedorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield (0, clientesRepository_1.getClientes)();
    return clientes.filter((cliente) => cliente.vendedor_id === id);
});
exports.getClientesVendedorService = getClientesVendedorService;
const getClientesByIdService = (id, rol) => __awaiter(void 0, void 0, void 0, function* () {
    if (rol === 'admin') {
        const clientes = yield (0, clientesRepository_1.getClientes)();
        return clientes;
    }
    const cliente = yield (0, clientesRepository_1.getClienteById)(id);
    return cliente;
});
exports.getClientesByIdService = getClientesByIdService;
const createClientesService = (clienteData, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoCliente = yield (0, clientesRepository_1.createCliente)(clienteData);
    const mesActual = new Date().getMonth() + 1;
    (0, metasServices_1.updateMetasClientesService)(nuevoCliente.vendedor_id, 1, mesActual, rol);
    return nuevoCliente;
});
exports.createClientesService = createClientesService;
const updateClientesService = (id, clienteData) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = yield (0, clientesRepository_1.getOneCliente)(id);
    if (cliente && clienteData.estado && cliente.estado !== clienteData.estado) {
        clienteData.fecha_estado = new Date();
        clienteData.estado_anterior = cliente === null || cliente === void 0 ? void 0 : cliente.estado;
    }
    const clienteActualizado = yield (0, clientesRepository_1.updateCliente)(id, clienteData);
    return {
        message: 'Cliente actualizado',
        data: clienteActualizado,
    };
});
exports.updateClientesService = updateClientesService;
const deleteClientesService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const clienteEliminado = yield (0, clientesRepository_1.deleteCliente)(id);
    return {
        message: 'Cliente eliminado',
        data: clienteEliminado,
    };
});
exports.deleteClientesService = deleteClientesService;
