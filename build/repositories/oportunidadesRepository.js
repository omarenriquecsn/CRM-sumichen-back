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
exports.deleteOportunidad = exports.updateOportunidad = exports.createOportunidad = exports.getOportunidadById = exports.getOportunidads = void 0;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const Oportunidades_1 = require("../entities/Oportunidades");
const getOportunidads = () => __awaiter(void 0, void 0, void 0, function* () {
    const OportunidadRepository = dataBaseConfig_1.AppDataSource.getRepository(Oportunidades_1.Oportunidad);
    return yield OportunidadRepository.find();
});
exports.getOportunidads = getOportunidads;
const getOportunidadById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const OportunidadRepository = dataBaseConfig_1.AppDataSource.getRepository(Oportunidades_1.Oportunidad);
    return yield OportunidadRepository.find({ where: { vendedor_id: id } });
});
exports.getOportunidadById = getOportunidadById;
const createOportunidad = (OportunidadData) => __awaiter(void 0, void 0, void 0, function* () {
    const OportunidadRepository = dataBaseConfig_1.AppDataSource.getRepository(Oportunidades_1.Oportunidad);
    const newOportunidad = OportunidadRepository.create(OportunidadData);
    return yield OportunidadRepository.save(newOportunidad);
});
exports.createOportunidad = createOportunidad;
const updateOportunidad = (id, OportunidadData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!OportunidadData || Object.keys(OportunidadData).length === 0) {
        throw new Error('No se proporcionaron datos para actualizar al Oportunidad.');
    }
    const OportunidadRepository = dataBaseConfig_1.AppDataSource.getRepository(Oportunidades_1.Oportunidad);
    yield OportunidadRepository.update(id, OportunidadData);
    return yield OportunidadRepository.findOneBy({ id });
});
exports.updateOportunidad = updateOportunidad;
const deleteOportunidad = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const OportunidadRepository = dataBaseConfig_1.AppDataSource.getRepository(Oportunidades_1.Oportunidad);
    return yield OportunidadRepository.delete(id);
});
exports.deleteOportunidad = deleteOportunidad;
