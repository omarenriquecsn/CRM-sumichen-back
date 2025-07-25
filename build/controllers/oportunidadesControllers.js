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
exports.deleteOportunidad = exports.updateOportunidad = exports.createOportunidad = exports.getOportunidadById = exports.getOportunidades = void 0;
const oportunidadesServices_1 = require("../services/oportunidadesServices");
const ApiError_1 = require("../utils/ApiError");
const getOportunidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oportunidades = yield (0, oportunidadesServices_1.getOportunidadesService)();
    if (oportunidades.length === 0)
        throw new ApiError_1.ApiError('No hay oportunidades registradas');
    res.json(oportunidades);
});
exports.getOportunidades = getOportunidades;
const getOportunidadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oportunidad = yield (0, oportunidadesServices_1.getOportunidadesByIdService)(id);
    if (!oportunidad)
        throw new ApiError_1.ApiError('Oportunidad no encontrada', 404);
    res.json(oportunidad);
});
exports.getOportunidadById = getOportunidadById;
const createOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaOportunidad = yield (0, oportunidadesServices_1.createOportunidadesService)(req.body);
    if (!nuevaOportunidad)
        throw new ApiError_1.ApiError('Error al crear la oportunidad', 400);
    res.status(201).json(nuevaOportunidad);
});
exports.createOportunidad = createOportunidad;
const updateOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const actualizada = yield (0, oportunidadesServices_1.updateOportunidadesService)(id, req.body);
    if (!actualizada)
        throw new ApiError_1.ApiError('No se pudo actualizar la oportunidad', 400);
    res.json(actualizada);
});
exports.updateOportunidad = updateOportunidad;
const deleteOportunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const borrada = yield (0, oportunidadesServices_1.deleteOportunidadesService)(id);
    if (!borrada)
        throw new ApiError_1.ApiError('No se pudo eliminar la oportunidad', 400);
    res.status(204).send();
});
exports.deleteOportunidad = deleteOportunidad;
