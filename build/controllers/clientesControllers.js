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
exports.deleteClientes = exports.updateClientes = exports.createClientes = exports.getClientesById = exports.getClientes = void 0;
const clientesServices_1 = require("../services/clientesServices");
const ApiError_1 = require("../utils/ApiError");
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield (0, clientesServices_1.getClientesService)();
    if (clientes.length === 0)
        throw new ApiError_1.ApiError('No hay clientes para mostrar');
    res.json(clientes);
});
exports.getClientes = getClientes;
const getClientesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield (0, clientesServices_1.getClientesByIdService)(id);
    if (!cliente)
        throw new ApiError_1.ApiError('Cliente no encontrado', 404);
    res.json(cliente);
});
exports.getClientesById = getClientesById;
const createClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoCliente = yield (0, clientesServices_1.createClientesService)(req.body);
    if (!nuevoCliente)
        throw new ApiError_1.ApiError('No se ha creado el cliente', 400);
    res.status(201).json(nuevoCliente);
});
exports.createClientes = createClientes;
const updateClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const clienteActualizado = yield (0, clientesServices_1.updateClientesService)(id, req.body);
    if (!clienteActualizado)
        throw new ApiError_1.ApiError('No se actualizó el cliente', 400);
    res.json(clienteActualizado);
});
exports.updateClientes = updateClientes;
const deleteClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const clienteBorrado = yield (0, clientesServices_1.deleteClientesService)(id);
    if (!clienteBorrado)
        throw new ApiError_1.ApiError('No se ha borrado el cliente', 400);
    res.status(204).send();
});
exports.deleteClientes = deleteClientes;
