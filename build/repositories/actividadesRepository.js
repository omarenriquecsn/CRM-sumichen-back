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
exports.deleteActividad = exports.updateActividad = exports.createActividad = exports.getActividadById = exports.getActividads = void 0;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const Actividades_1 = require("../entities/Actividades");
const getActividads = () => __awaiter(void 0, void 0, void 0, function* () {
    const ActividadRepository = dataBaseConfig_1.AppDataSource.getRepository(Actividades_1.Actividad);
    return yield ActividadRepository.find();
});
exports.getActividads = getActividads;
const getActividadById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ActividadRepository = dataBaseConfig_1.AppDataSource.getRepository(Actividades_1.Actividad);
    return yield ActividadRepository.find({ where: { vendedor_id: id } });
});
exports.getActividadById = getActividadById;
const createActividad = (ActividadData) => __awaiter(void 0, void 0, void 0, function* () {
    const ActividadRepository = dataBaseConfig_1.AppDataSource.getRepository(Actividades_1.Actividad);
    const newActividad = ActividadRepository.create(ActividadData);
    return yield ActividadRepository.save(newActividad);
});
exports.createActividad = createActividad;
const updateActividad = (id, ActividadData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ActividadData || Object.keys(ActividadData).length === 0) {
        throw new Error('No se proporcionaron datos para actualizar al Actividad.');
    }
    console.log(ActividadData);
    const ActividadRepository = dataBaseConfig_1.AppDataSource.getRepository(Actividades_1.Actividad);
    yield ActividadRepository.update(id, ActividadData);
    return yield ActividadRepository.findOneBy({ id });
});
exports.updateActividad = updateActividad;
const deleteActividad = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ActividadRepository = dataBaseConfig_1.AppDataSource.getRepository(Actividades_1.Actividad);
    return yield ActividadRepository.delete(id);
});
exports.deleteActividad = deleteActividad;
