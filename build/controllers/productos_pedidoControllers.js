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
exports.deleteProductoPedido = exports.updateProductoPedido = exports.createProductoPedido = exports.getProductoPedidoById = exports.getProductosPedido = void 0;
const productos_pedidoServices_1 = require("../services/productos_pedidoServices");
const ApiError_1 = require("../utils/ApiError");
const getProductosPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lista = yield (0, productos_pedidoServices_1.getProductos_pedidoService)();
    if (lista.length === 0)
        throw new ApiError_1.ApiError('No hay productos asociados a pedidos');
    res.json(lista);
});
exports.getProductosPedido = getProductosPedido;
const getProductoPedidoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const item = yield (0, productos_pedidoServices_1.getProductos_pedidoByIdService)(id);
    if (!item)
        throw new ApiError_1.ApiError('Producto de pedido no encontrado', 404);
    res.json(item);
});
exports.getProductoPedidoById = getProductoPedidoById;
const createProductoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoItem = yield (0, productos_pedidoServices_1.createProductos_pedidoService)(req.body);
    if (!nuevoItem)
        throw new ApiError_1.ApiError('No se pudo crear el producto del pedido', 400);
    res.status(201).json(nuevoItem);
});
exports.createProductoPedido = createProductoPedido;
const updateProductoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const actualizado = yield (0, productos_pedidoServices_1.updateProductos_pedidoService)(id, req.body);
    if (!actualizado)
        throw new ApiError_1.ApiError('No se pudo actualizar el producto del pedido', 400);
    res.json(actualizado);
});
exports.updateProductoPedido = updateProductoPedido;
const deleteProductoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const borrado = yield (0, productos_pedidoServices_1.deleteProductos_pedidoService)(id);
    if (!borrado)
        throw new ApiError_1.ApiError('No se pudo eliminar el producto del pedido', 400);
    res.status(204).send();
});
exports.deleteProductoPedido = deleteProductoPedido;
