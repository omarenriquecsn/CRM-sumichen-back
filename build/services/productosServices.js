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
exports.updateProductoService = exports.createProductoService = exports.getProductoByIdService = exports.getProductosService = void 0;
const productosRepository_1 = require("../repositories/productosRepository");
const getProductosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield (0, productosRepository_1.getProductos)();
    return productos;
});
exports.getProductosService = getProductosService;
const getProductoByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield (0, productosRepository_1.getProductoById)(id);
    return producto;
});
exports.getProductoByIdService = getProductoByIdService;
const createProductoService = (productoData) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoProducto = yield (0, productosRepository_1.createProducto)(productoData);
    return nuevoProducto;
});
exports.createProductoService = createProductoService;
const updateProductoService = (id, productoData) => __awaiter(void 0, void 0, void 0, function* () {
    const productoActualizado = yield (0, productosRepository_1.updateProducto)(id, productoData);
    return productoActualizado;
});
exports.updateProductoService = updateProductoService;
