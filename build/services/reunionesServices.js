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
exports.deleteReunionesService = exports.updateReunionesService = exports.createReunionesService = exports.getReunionesByIdService = exports.getReunionesByVendedorService = exports.getReunionesService = void 0;
const ActividadesEnum_1 = require("../enums/ActividadesEnum");
const reunionesRepository_1 = require("../repositories/reunionesRepository");
const actividadesServices_1 = require("./actividadesServices");
const getReunionesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const reunions = yield (0, reunionesRepository_1.getReunions)();
    return reunions;
});
exports.getReunionesService = getReunionesService;
const getReunionesByVendedorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reuniones = yield (0, reunionesRepository_1.getReunions)();
    return reuniones.filter((reunion) => reunion.vendedor_id === id);
});
exports.getReunionesByVendedorService = getReunionesByVendedorService;
const getReunionesByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reunion = yield (0, reunionesRepository_1.getReunionById)(id);
    return reunion;
});
exports.getReunionesByIdService = getReunionesByIdService;
const createReunionesService = (ReunionData) => __awaiter(void 0, void 0, void 0, function* () {
    const neuvaReunion = yield (0, reunionesRepository_1.createReunion)(ReunionData);
    if (neuvaReunion === null)
        throw new Error('No se pudo crear la reunion');
    const newActividad = {
        titulo: neuvaReunion.titulo,
        descripcion: neuvaReunion.descripcion,
        cliente_id: neuvaReunion.cliente_id,
        vendedor_id: neuvaReunion.vendedor_id,
        fecha: neuvaReunion.fecha_inicio,
        tipo: ActividadesEnum_1.ActividadesEnum.REUNION,
        fecha_vencimiento: neuvaReunion.fecha_fin,
        id_tipo_actividad: neuvaReunion.id,
    };
    yield (0, actividadesServices_1.createActividadesService)(newActividad);
    return neuvaReunion;
});
exports.createReunionesService = createReunionesService;
const updateReunionesService = (id, reunionData, rol) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reunionActualizada = yield (0, reunionesRepository_1.updateReunion)(id, reunionData);
    if (!reunionActualizada)
        throw new Error('No se pudo actualizar la reunion');
    if (reunionActualizada.estado === 'completada') {
        const allActividades = yield (0, actividadesServices_1.getActividadesByIdService)(reunionActualizada.vendedor_id, rol);
        console.log(reunionActualizada);
        const actividadActualizada = (_a = allActividades.find((actividad) => actividad.cliente_id === reunionActualizada.cliente_id &&
            actividad.titulo === reunionActualizada.titulo &&
            new Date(actividad.fecha_creacion).getDate() ===
                new Date(reunionActualizada.fecha_creacion).getDate() &&
            actividad.tipo === ActividadesEnum_1.ActividadesEnum.REUNION)) !== null && _a !== void 0 ? _a : allActividades.find((actividad) => actividad.id_tipo_actividad === reunionActualizada.id &&
            actividad.tipo === ActividadesEnum_1.ActividadesEnum.REUNION);
        if (!actividadActualizada) {
            throw new Error('No se pudo actualizar la actividad');
        }
        yield (0, actividadesServices_1.updateActividadesService)(actividadActualizada.id, {
            completado: true,
        });
    }
    return reunionActualizada;
});
exports.updateReunionesService = updateReunionesService;
const deleteReunionesService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reunionBorrada = yield (0, reunionesRepository_1.deleteReunion)(id);
    return reunionBorrada;
});
exports.deleteReunionesService = deleteReunionesService;
