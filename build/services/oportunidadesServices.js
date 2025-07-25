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
exports.deleteOportunidadesService = exports.updateOportunidadesService = exports.getOportunidadesByIdService = exports.createOportunidadesService = exports.getOportunidadesService = void 0;
const oportunidadesRepository_1 = require("../repositories/oportunidadesRepository");
const getOportunidadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const oportunidades = yield (0, oportunidadesRepository_1.getOportunidads)();
    return oportunidades;
});
exports.getOportunidadesService = getOportunidadesService;
const createOportunidadesService = (oportunidadData) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaOportunidad = yield (0, oportunidadesRepository_1.createOportunidad)(oportunidadData);
    return nuevaOportunidad;
});
exports.createOportunidadesService = createOportunidadesService;
const getOportunidadesByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const oportunidades = yield (0, oportunidadesRepository_1.getOportunidadById)(id);
    return oportunidades;
});
exports.getOportunidadesByIdService = getOportunidadesByIdService;
const updateOportunidadesService = (id, oportunidadData) => __awaiter(void 0, void 0, void 0, function* () {
    const oportunidadActualizada = yield (0, oportunidadesRepository_1.updateOportunidad)(id, oportunidadData);
    return oportunidadActualizada;
});
exports.updateOportunidadesService = updateOportunidadesService;
const deleteOportunidadesService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const oportunidadBorrada = yield (0, oportunidadesRepository_1.deleteOportunidad)(id);
    return oportunidadBorrada;
});
exports.deleteOportunidadesService = deleteOportunidadesService;
