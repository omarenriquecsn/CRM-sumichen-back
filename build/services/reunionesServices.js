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
const reunionesRepository_1 = require("../repositories/reunionesRepository");
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
    return neuvaReunion;
});
exports.createReunionesService = createReunionesService;
const updateReunionesService = (id, reunionData) => __awaiter(void 0, void 0, void 0, function* () {
    const reunionActualizada = yield (0, reunionesRepository_1.updateReunion)(id, reunionData);
    return reunionActualizada;
});
exports.updateReunionesService = updateReunionesService;
const deleteReunionesService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reunionBorrada = yield (0, reunionesRepository_1.deleteReunion)(id);
    return reunionBorrada;
});
exports.deleteReunionesService = deleteReunionesService;
