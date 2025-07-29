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
exports.deletePedido = exports.updatePedido = exports.createPedido = exports.getPedidosByVendedor = exports.getPedidoById = exports.getPedidos = exports.subirEvidencia = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const multer_1 = __importDefault(require("multer"));
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const upload = (0, multer_1.default)();
exports.subirEvidencia = [
    upload.single('file'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ error: 'No se envió ningún archivo' });
        }
        // Subir archivo a Supabase Storage
        const fileExt = req.file.originalname.split('.').pop();
        const fileName = `pedido_${id}_${Date.now()}.${fileExt}`;
        const { data, error } = yield supabase.storage
            .from('evidencias')
            .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: true,
        });
        if (error) {
            return res.status(500).json({ error: 'Error al subir archivo a Supabase', details: error.message });
        }
        // Construir URL pública
        const { publicUrl } = supabase.storage.from('evidencias').getPublicUrl(fileName).data;
        // Actualizar pedido con la URL
        const actualizado = yield (0, pedidosServices_1.updatePedidosService)(id, { evidencia_url: publicUrl });
        if (!actualizado) {
            return res.status(500).json({ error: 'No se pudo actualizar el pedido con la evidencia' });
        }
        res.json({ url: publicUrl });
    })
];
const pedidosServices_1 = require("../services/pedidosServices");
const ApiError_1 = require("../utils/ApiError");
const getPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pedidos = yield (0, pedidosServices_1.getPedidosService)();
    if (!pedidos)
        return [];
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
