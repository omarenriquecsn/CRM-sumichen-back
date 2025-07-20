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
exports.deletePedido = exports.updatePedido = exports.createPedido = exports.getPedidosByVendedor = exports.getPedidoById = exports.getPedidos = void 0;
const pedidosServices_1 = require("../services/pedidosServices");
const ApiError_1 = require("../utils/ApiError");
const getPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pedidos = yield (0, pedidosServices_1.getPedidosService)();
    if (pedidos.length === 0)
        throw new ApiError_1.ApiError('No hay pedidos registrados');
    res.json(pedidos);
});
exports.getPedidos = getPedidos;
const getPedidoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pedido = yield (0, pedidosServices_1.getPedidosByIdService)(id);
    if (!pedido)
        throw new ApiError_1.ApiError('Pedido no encontrado', 404);
    res.json(pedido);
});
exports.getPedidoById = getPedidoById;
const getPedidosByVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pedidos = yield (0, pedidosServices_1.getPedidosByVendedorService)(id);
    if (pedidos.length === 0)
        throw new ApiError_1.ApiError('No hay pedidos disponibles');
    res.json(pedidos);
});
exports.getPedidosByVendedor = getPedidosByVendedor;
const createPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoPedido = yield (0, pedidosServices_1.createPedidosService)(req.body);
    if (!nuevoPedido)
        throw new ApiError_1.ApiError('Error al crear el pedido', 400);
    res.status(201).json(nuevoPedido);
});
exports.createPedido = createPedido;
const updatePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const actualizado = yield (0, pedidosServices_1.updatePedidosService)(id, req.body);
    if (!actualizado)
        throw new ApiError_1.ApiError('No se pudo actualizar el pedido', 400);
    res.json(actualizado);
});
exports.updatePedido = updatePedido;
const deletePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const borrado = yield (0, pedidosServices_1.deletePedidosService)(id);
    if (!borrado)
        throw new ApiError_1.ApiError('No se pudo eliminar el pedido', 400);
    res.status(204).send();
});
exports.deletePedido = deletePedido;
