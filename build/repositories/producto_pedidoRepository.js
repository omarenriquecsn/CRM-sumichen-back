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
exports.deleteProductosPedido = exports.updateProductosPedido = exports.createProductosPedido = exports.getProductosPedidoById = exports.getProductosPedidos = void 0;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const Productos_pedido_1 = require("../entities/Productos_pedido");
const getProductosPedidos = () => __awaiter(void 0, void 0, void 0, function* () {
    const ProductosPedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_pedido_1.ProductosPedido);
    return yield ProductosPedidoRepository.find();
});
exports.getProductosPedidos = getProductosPedidos;
const getProductosPedidoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductosPedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_pedido_1.ProductosPedido);
    return yield ProductosPedidoRepository.find({ where: { pedido_id: id } });
});
exports.getProductosPedidoById = getProductosPedidoById;
const createProductosPedido = (ProductosPedidoData) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductosPedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_pedido_1.ProductosPedido);
    const newProductosPedido = ProductosPedidoRepository.create(ProductosPedidoData);
    return yield ProductosPedidoRepository.save(newProductosPedido);
});
exports.createProductosPedido = createProductosPedido;
const updateProductosPedido = (id, ProductosPedidoData) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductosPedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_pedido_1.ProductosPedido);
    yield ProductosPedidoRepository.update(id, ProductosPedidoData);
    return yield ProductosPedidoRepository.findOneBy({ id });
});
exports.updateProductosPedido = updateProductosPedido;
const deleteProductosPedido = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductosPedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_pedido_1.ProductosPedido);
    return yield ProductosPedidoRepository.delete(id);
});
exports.deleteProductosPedido = deleteProductosPedido;
