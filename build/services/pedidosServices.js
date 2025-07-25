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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePedidosService = exports.updatePedidosService = exports.createPedidosService = exports.getPedidosByIdService = exports.getPedidosByVendedorService = exports.getPedidosService = void 0;
const pedidosRepository_1 = require("../repositories/pedidosRepository");
const producto_pedidoRepository_1 = require("../repositories/producto_pedidoRepository");
const getPedidosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const pedidos = yield (0, pedidosRepository_1.getPedidos)();
    return pedidos;
});
exports.getPedidosService = getPedidosService;
const getPedidosByVendedorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pedidos = yield (0, pedidosRepository_1.getPedidos)();
    return pedidos.filter((pedido) => pedido.vendedor_id === id);
});
exports.getPedidosByVendedorService = getPedidosByVendedorService;
const getPedidosByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pedido = yield (0, pedidosRepository_1.getPedidoById)(id);
    return pedido;
});
exports.getPedidosByIdService = getPedidosByIdService;
const createPedidosService = (pedidoData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('pedidoData', pedidoData);
    const { productos } = pedidoData, rest = __rest(pedidoData, ["productos"]);
    console.log('rest', rest);
    const neuevoPedido = Object.assign(Object.assign({}, rest), { impuestos: rest.impuestos === 'exento' ? 0 : 0.16, subtotal: productos.reduce((acc, producto) => acc + producto.precio_unitario * producto.cantidad, 0), total: 0 });
    neuevoPedido.total = neuevoPedido.subtotal * (neuevoPedido.impuestos + 1);
    const pedido = yield (0, pedidosRepository_1.createPedido)(neuevoPedido);
    if (!pedido) {
        throw new Error('Error al crear el pedido');
    }
    const productosPedido = productos.map((producto) => (Object.assign(Object.assign({}, producto), { pedido_id: pedido.id, total: producto.precio_unitario * producto.cantidad })));
    yield Promise.all(productosPedido.map((producto) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, producto_pedidoRepository_1.createProductosPedido)(producto);
    })));
    return pedido;
});
exports.createPedidosService = createPedidosService;
const updatePedidosService = (id, pedidoData) => __awaiter(void 0, void 0, void 0, function* () {
    const pedidoActualizado = yield (0, pedidosRepository_1.updatePedido)(id, pedidoData);
    return pedidoActualizado;
});
exports.updatePedidosService = updatePedidosService;
const deletePedidosService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pedidoBorrado = yield (0, pedidosRepository_1.deletePedido)(id);
    return pedidoBorrado;
});
exports.deletePedidosService = deletePedidosService;
