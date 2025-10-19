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
exports.deleteActividadesService = exports.updateActividadesService = exports.createActividadesService = exports.getActividadesByIdService = exports.getActividadesService = void 0;
const ActividadesEnum_1 = require("../enums/ActividadesEnum");
const actividadesRepository_1 = require("../repositories/actividadesRepository");
const reunionesServices_1 = require("./reunionesServices");
const ticketsServices_1 = require("./ticketsServices");
const getActividadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const actividades = yield (0, actividadesRepository_1.getActividads)();
    if (actividades.length === 0)
        throw new Error('No hay actividades para mostrar');
    return actividades;
});
exports.getActividadesService = getActividadesService;
const getActividadesByIdService = (id, rol) => __awaiter(void 0, void 0, void 0, function* () {
    if (rol === 'admin') {
        const actividades = yield (0, actividadesRepository_1.getActividads)();
        return actividades;
    }
    const actividades = yield (0, actividadesRepository_1.getActividadById)(id);
    if (actividades.length === 0)
        throw new Error('No hay actividades para mostrar');
    return actividades;
});
exports.getActividadesByIdService = getActividadesByIdService;
const createActividadesService = (ActividadData) => __awaiter(void 0, void 0, void 0, function* () {
    const actividadCreada = yield (0, actividadesRepository_1.createActividad)(ActividadData);
    return actividadCreada;
});
exports.createActividadesService = createActividadesService;
const updateActividadesService = (id, ActividadData) => __awaiter(void 0, void 0, void 0, function* () {
    if (ActividadData && ActividadData.tipo === ActividadesEnum_1.ActividadesEnum.REUNION && ActividadData.id_tipo_actividad) {
        // pass the reunion id string to the service
        yield (0, reunionesServices_1.updateReunionesService)(ActividadData.id_tipo_actividad, { descripcion: ActividadData.descripcion }, 'vendedor');
    }
    if (ActividadData && ActividadData.tipo === ActividadesEnum_1.ActividadesEnum.TAREA && ActividadData.id_tipo_actividad) {
        // Here you can add logic to update the related TAREA entity if needed
        yield (0, ticketsServices_1.updateTicketsService)(ActividadData.id_tipo_actividad, { descripcion: ActividadData.descripcion }, 'vendedor');
    }
    const actividadActualizada = yield (0, actividadesRepository_1.updateActividad)(id, ActividadData);
    return actividadActualizada;
});
exports.updateActividadesService = updateActividadesService;
const deleteActividadesService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const actividadBorrada = yield (0, actividadesRepository_1.deleteActividad)(id);
    return actividadBorrada;
});
exports.deleteActividadesService = deleteActividadesService;
