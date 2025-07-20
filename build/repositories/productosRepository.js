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
exports.updateProducto = exports.createProducto = exports.getProductoById = exports.getProductos = void 0;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const Productos_1 = require("../entities/Productos");
const getProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    const ProductoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_1.Producto);
    return yield ProductoRepository.find();
});
exports.getProductos = getProductos;
const getProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_1.Producto);
    return yield ProductoRepository.findOneBy({ id });
});
exports.getProductoById = getProductoById;
const createProducto = (ProductoData) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_1.Producto);
    const newProducto = ProductoRepository.create(ProductoData);
    return yield ProductoRepository.save(newProducto);
});
exports.createProducto = createProducto;
const updateProducto = (id, ProductoData) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductoRepository = dataBaseConfig_1.AppDataSource.getRepository(Productos_1.Producto);
    yield ProductoRepository.update(id, ProductoData);
    return yield ProductoRepository.findOneBy({ id });
});
exports.updateProducto = updateProducto;
