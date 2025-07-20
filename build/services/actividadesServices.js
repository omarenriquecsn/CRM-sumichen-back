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
const getActividadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Actividades';
});
exports.getActividadesService = getActividadesService;
const getActividadesByIdService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Actividades por id';
});
exports.getActividadesByIdService = getActividadesByIdService;
const createActividadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Crear Actividades';
});
exports.createActividadesService = createActividadesService;
const updateActividadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Actualizar Actividades';
});
exports.updateActividadesService = updateActividadesService;
const deleteActividadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return 'Eliminar Actividades';
});
exports.deleteActividadesService = deleteActividadesService;
