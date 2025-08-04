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
exports.deleteReunion = exports.updateReunion = exports.createReunion = exports.getReunionById = exports.getReunions = void 0;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const EstadoReunionEnum_1 = require("../enums/EstadoReunionEnum");
const Reuniones_1 = require("../entities/Reuniones");
const getReunions = () => __awaiter(void 0, void 0, void 0, function* () {
    const ReunionRepository = dataBaseConfig_1.AppDataSource.getRepository(Reuniones_1.Reunion);
    return yield ReunionRepository.find({
        order: { fecha_creacion: 'DESC' },
    });
});
exports.getReunions = getReunions;
const getReunionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ReunionRepository = dataBaseConfig_1.AppDataSource.getRepository(Reuniones_1.Reunion);
    return yield ReunionRepository.find({
        where: { vendedor_id: id },
        relations: ['cliente'],
        order: { fecha_creacion: 'DESC' },
    });
});
exports.getReunionById = getReunionById;
const createReunion = (ReunionData) => __awaiter(void 0, void 0, void 0, function* () {
    const ReunionRepository = dataBaseConfig_1.AppDataSource.getRepository(Reuniones_1.Reunion);
    const newReunion = ReunionRepository.create(ReunionData);
    return yield ReunionRepository.save(newReunion);
});
exports.createReunion = createReunion;
const updateReunion = (id, ReunionData) => __awaiter(void 0, void 0, void 0, function* () {
    const ReunionRepository = dataBaseConfig_1.AppDataSource.getRepository(Reuniones_1.Reunion);
    yield ReunionRepository.update(id, ReunionData);
    return yield ReunionRepository.findOneBy({ id });
});
exports.updateReunion = updateReunion;
const deleteReunion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ReunionRepository = dataBaseConfig_1.AppDataSource.getRepository(Reuniones_1.Reunion);
    return yield ReunionRepository.update(id, {
        estado: EstadoReunionEnum_1.EstadoReunionEnum.CANCELADA,
    });
});
exports.deleteReunion = deleteReunion;
