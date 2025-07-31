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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirInventario = exports.updateProducto = exports.createProducto = exports.getProductoById = exports.getProductos = void 0;
const productosServices_1 = require("../services/productosServices");
const ApiError_1 = require("../utils/ApiError");
const supabase_js_1 = require("@supabase/supabase-js");
const multer_1 = __importDefault(require("multer"));
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const upload = (0, multer_1.default)();
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield (0, productosServices_1.getProductosService)();
    if (productos.length === 0)
        throw new ApiError_1.ApiError('No hay productos disponibles');
    res.json(productos);
});
exports.getProductos = getProductos;
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield (0, productosServices_1.getProductoByIdService)(id);
    if (!producto)
        throw new ApiError_1.ApiError('Producto no encontrado', 404);
    res.json(producto);
});
exports.getProductoById = getProductoById;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoProducto = yield (0, productosServices_1.createProductoService)(req.body);
    if (!nuevoProducto)
        throw new ApiError_1.ApiError('No se pudo crear el producto', 400);
    res.status(201).json(nuevoProducto);
});
exports.createProducto = createProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productoActualizado = yield (0, productosServices_1.updateProductoService)(id, req.body);
    if (!productoActualizado)
        throw new ApiError_1.ApiError('No se pudo actualizar el producto', 400);
    res.json(productoActualizado);
});
exports.updateProducto = updateProducto;
exports.subirInventario = [
    upload.single('file'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha subido ningún archivo' });
        }
        const fileName = 'inventario.xlsx';
        const { data, error } = yield supabase.storage
            .from('inventario')
            .upload(fileName, req.file.buffer);
        if (error) {
            return res.status(500).json({ error: 'Error al subir el archivo' });
        }
        res.status(200).json({ message: 'Archivo subido exitosamente', fileName });
    }),
];
