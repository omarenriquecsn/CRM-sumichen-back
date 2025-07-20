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
exports.deleteActividades = exports.updateActividades = exports.createActividades = exports.getActividadesById = exports.getActividades = void 0;
const actividadesServices_1 = require("../services/actividadesServices");
const ApiError_1 = require("../utils/ApiError");
const getActividades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actividades = yield (0, actividadesServices_1.getActividadesService)();
    if (actividades.length === 0)
        throw new ApiError_1.ApiError('No hay actividades para mostrar');
    res.json(actividades);
});
exports.getActividades = getActividades;
const getActividadesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actividad = yield (0, actividadesServices_1.getActividadesByIdService)();
    if (!actividad)
        throw new ApiError_1.ApiError('Actividad no encontrada', 404);
    res.json(actividad);
});
exports.getActividadesById = getActividadesById;
const createActividades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newActividad = yield (0, actividadesServices_1.createActividadesService)();
    if (!newActividad)
        throw new ApiError_1.ApiError('No se ha creado la actividad', 400);
    res.json(newActividad);
});
exports.createActividades = createActividades;
const updateActividades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const laActividad = yield (0, actividadesServices_1.updateActividadesService)();
    if (!laActividad)
        throw new ApiError_1.ApiError('No se actualizo la activdad', 400);
    res.json(laActividad);
});
exports.updateActividades = updateActividades;
const deleteActividades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actividadBorrada = yield (0, actividadesServices_1.deleteActividadesService)();
    if (!actividadBorrada)
        throw new ApiError_1.ApiError('No se ha borrado la actividad', 400);
    res.status(204).send();
});
exports.deleteActividades = deleteActividades;
