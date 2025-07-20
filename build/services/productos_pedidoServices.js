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
exports.deleteProductos_pedidoService = exports.updateProductos_pedidoService = exports.createProductos_pedidoService = exports.getProductos_pedidoByIdService = exports.getProductosPedidosByVendedorService = exports.getProductos_pedidoService = void 0;
const producto_pedidoRepository_1 = require("../repositories/producto_pedidoRepository");
const getProductos_pedidoService = () => __awaiter(void 0, void 0, void 0, function* () {
    const productos_pedido = yield (0, producto_pedidoRepository_1.getProductosPedidos)();
    return productos_pedido;
});
exports.getProductos_pedidoService = getProductos_pedidoService;
const getProductosPedidosByVendedorService = (pedido_id) => __awaiter(void 0, void 0, void 0, function* () {
    const productos_pedido = yield (0, producto_pedidoRepository_1.getProductosPedidos)();
    return productos_pedido.filter((pp) => pp.pedido_id === pedido_id);
});
exports.getProductosPedidosByVendedorService = getProductosPedidosByVendedorService;
const getProductos_pedidoByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productos_pedido = yield (0, producto_pedidoRepository_1.getProductosPedidoById)(id);
    return productos_pedido;
});
exports.getProductos_pedidoByIdService = getProductos_pedidoByIdService;
const createProductos_pedidoService = (Productos_pedidoData) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoProductos_pedido = yield (0, producto_pedidoRepository_1.createProductosPedido)(Productos_pedidoData);
    return nuevoProductos_pedido;
});
exports.createProductos_pedidoService = createProductos_pedidoService;
const updateProductos_pedidoService = (id, Productos_pedidoData) => __awaiter(void 0, void 0, void 0, function* () {
    const actualizado = yield (0, producto_pedidoRepository_1.updateProductosPedido)(id, Productos_pedidoData);
    return actualizado;
});
exports.updateProductos_pedidoService = updateProductos_pedidoService;
const deleteProductos_pedidoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const borrado = yield (0, producto_pedidoRepository_1.deleteProductosPedido)(id);
    return borrado;
});
exports.deleteProductos_pedidoService = deleteProductos_pedidoService;
