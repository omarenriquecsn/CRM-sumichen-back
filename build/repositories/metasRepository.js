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
exports.deleteMeta = exports.updateMeta = exports.createMeta = exports.getMetaById = exports.getMetas = void 0;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const Metas_1 = require("../entities/Metas");
const getMetas = () => __awaiter(void 0, void 0, void 0, function* () {
    const MetaRepository = dataBaseConfig_1.AppDataSource.getRepository(Metas_1.Meta);
    return yield MetaRepository.find({ order: { mes: 'ASC' } });
});
exports.getMetas = getMetas;
const getMetaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const MetaRepository = dataBaseConfig_1.AppDataSource.getRepository(Metas_1.Meta);
    return yield MetaRepository.find({ where: { vendedor_id: id } });
});
exports.getMetaById = getMetaById;
const createMeta = (MetaData) => __awaiter(void 0, void 0, void 0, function* () {
    const MetaRepository = dataBaseConfig_1.AppDataSource.getRepository(Metas_1.Meta);
    const newMeta = MetaRepository.create(MetaData);
    return yield MetaRepository.save(newMeta);
});
exports.createMeta = createMeta;
const updateMeta = (id, MetaData) => __awaiter(void 0, void 0, void 0, function* () {
    const MetaRepository = dataBaseConfig_1.AppDataSource.getRepository(Metas_1.Meta);
    yield MetaRepository.update(id, MetaData);
    return yield MetaRepository.findOneBy({ id });
});
exports.updateMeta = updateMeta;
const deleteMeta = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const MetaRepository = dataBaseConfig_1.AppDataSource.getRepository(Metas_1.Meta);
    return yield MetaRepository.delete(id);
});
exports.deleteMeta = deleteMeta;
