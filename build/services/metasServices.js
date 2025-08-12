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
exports.deleteMetasService = exports.updateMetasService = exports.updateMetasClientesService = exports.createMetasService = exports.getMetasByIdService = exports.getMetasService = void 0;
const metasRepository_1 = require("../repositories/metasRepository");
const pedidosServices_1 = require("./pedidosServices");
const clientesServices_1 = require("./clientesServices");
const getMetasService = () => __awaiter(void 0, void 0, void 0, function* () {
    const metas = yield (0, metasRepository_1.getMetas)();
    return metas;
});
exports.getMetasService = getMetasService;
const getMetasByIdService = (id, rol) => __awaiter(void 0, void 0, void 0, function* () {
    if (rol === 'admin') {
        const metas = yield (0, metasRepository_1.getMetas)();
        return metas;
    }
    const meta = yield (0, metasRepository_1.getMetaById)(id);
    return meta;
});
exports.getMetasByIdService = getMetasByIdService;
const createMetasService = (metaData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!metaData.vendedor_id)
        throw new Error('No se ha proporcionado un vendedor');
    const vendedorPedidos = yield (0, pedidosServices_1.getPedidosByVendedorService)(metaData.vendedor_id);
    const pedidosFiltrados = vendedorPedidos.filter((pedido) => pedido.estado === 'procesado');
    const clientes = yield (0, clientesServices_1.getClientesVendedorService)(metaData.vendedor_id);
    const clientesFiltrados = clientes.filter((cliente) => cliente.estado === 'activo');
    const metaActualizada = Object.assign(Object.assign({}, metaData), { ventas_actuales: vendedorPedidos.reduce((acc, pedido) => acc + pedido.total, 0), clientes_actuales: clientesFiltrados.length });
    const nuevaMeta = yield (0, metasRepository_1.createMeta)(metaActualizada);
    return nuevaMeta;
});
exports.createMetasService = createMetasService;
const updateMetasClientesService = (id, accion, valor, mes, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const metas = yield (0, exports.getMetasByIdService)(id, rol);
    metas.map((meta) => __awaiter(void 0, void 0, void 0, function* () {
        if (meta.mes === mes) {
            meta[accion] = valor;
            yield (0, metasRepository_1.updateMeta)(id, meta);
        }
    }));
});
exports.updateMetasClientesService = updateMetasClientesService;
const updateMetasService = (id, metaData) => __awaiter(void 0, void 0, void 0, function* () {
    const metaActualizada = yield (0, metasRepository_1.updateMeta)(id, metaData);
    return metaActualizada;
});
exports.updateMetasService = updateMetasService;
const deleteMetasService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const metaBorrada = yield (0, metasRepository_1.deleteMeta)(id);
    return metaBorrada;
});
exports.deleteMetasService = deleteMetasService;
