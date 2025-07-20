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
const getOportunidadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Oportunidades';
});
exports.getOportunidadesService = getOportunidadesService;
const createOportunidadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Crear Oportunidades';
});
exports.createOportunidadesService = createOportunidadesService;
const getOportunidadesByIdService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Oportunidades por id';
});
exports.getOportunidadesByIdService = getOportunidadesByIdService;
const updateOportunidadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Actualizar Oportunidades';
});
exports.updateOportunidadesService = updateOportunidadesService;
const deleteOportunidadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Eliminar Oportunidades';
});
exports.deleteOportunidadesService = deleteOportunidadesService;
