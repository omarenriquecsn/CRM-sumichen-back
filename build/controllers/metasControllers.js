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
exports.deleteMetas = exports.updateMetas = exports.createMetas = exports.getMetasById = exports.getMetas = void 0;
const metasServices_1 = require("../services/metasServices");
const ApiError_1 = require("../utils/ApiError");
const getMetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metas = yield (0, metasServices_1.getMetasService)();
    if (metas.length === 0)
        throw new ApiError_1.ApiError('No hay metas para mostrar');
    res.json(metas);
});
exports.getMetas = getMetas;
const getMetasById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rol } = req.user.user_metadata;
    const meta = yield (0, metasServices_1.getMetasByIdService)(id, rol);
    if (!meta)
        throw new ApiError_1.ApiError('Meta no encontrada', 404);
    res.json(meta);
});
exports.getMetasById = getMetasById;
const createMetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaMeta = yield (0, metasServices_1.createMetasService)(req.body);
    if (!nuevaMeta)
        throw new ApiError_1.ApiError('No se ha creado la meta', 400);
    res.status(201).json(nuevaMeta);
});
exports.createMetas = createMetas;
const updateMetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rol } = req.user.user_metadata;
    const metaActualizada = yield (0, metasServices_1.updateMetasService)(id, req.body);
    if (!metaActualizada)
        throw new ApiError_1.ApiError('No se actualizó la meta', 400);
    res.json(metaActualizada);
});
exports.updateMetas = updateMetas;
const deleteMetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const metaBorrada = yield (0, metasServices_1.deleteMetasService)(id);
    if (!metaBorrada)
        throw new ApiError_1.ApiError('No se ha borrado la meta', 400);
    res.status(204).send();
});
exports.deleteMetas = deleteMetas;
