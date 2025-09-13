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
exports.deleteReunion = exports.updateReunion = exports.createReunion = exports.getReunionesByVendedor = exports.getReunionById = exports.getReuniones = void 0;
const reunionesServices_1 = require("../services/reunionesServices");
const ApiError_1 = require("../utils/ApiError");
const getReuniones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reuniones = yield (0, reunionesServices_1.getReunionesService)();
    if (reuniones.length === 0)
        throw new ApiError_1.ApiError('No hay reuniones registradas');
    res.json(reuniones);
});
exports.getReuniones = getReuniones;
const getReunionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rol } = req.user.user_metadata;
    const reuniones = yield (0, reunionesServices_1.getReunionesByIdService)(id, rol);
    if (reuniones.length === 0)
        throw new ApiError_1.ApiError('No hay reuniones disponibles', 404);
    res.json(reuniones);
});
exports.getReunionById = getReunionById;
const getReunionesByVendedor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reuniones = yield (0, reunionesServices_1.getReunionesService)();
    return reuniones.filter((reunion) => reunion.vendedor_id === id);
});
exports.getReunionesByVendedor = getReunionesByVendedor;
const createReunion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaReunion = yield (0, reunionesServices_1.createReunionesService)(req.body);
    if (!nuevaReunion)
        throw new ApiError_1.ApiError('Error al crear la reunión', 400);
    res.status(201).json(nuevaReunion);
});
exports.createReunion = createReunion;
const updateReunion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rol } = req.user.user_metadata;
    const reunionActualizada = yield (0, reunionesServices_1.updateReunionesService)(id, req.body, rol);
    if (!reunionActualizada)
        throw new ApiError_1.ApiError('No se pudo actualizar la reunión', 400);
    res.json(reunionActualizada);
});
exports.updateReunion = updateReunion;
const deleteReunion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reunionBorrada = yield (0, reunionesServices_1.deleteReunionesService)(id);
    if (!reunionBorrada)
        throw new ApiError_1.ApiError('No se pudo eliminar la reunión', 400);
    res.status(204).send();
});
exports.deleteReunion = deleteReunion;
