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
exports.deleteUsuariosService = exports.updateUsuariosService = exports.createUsuariosService = exports.getUsuariosByIdService = exports.getUsuariosService = void 0;
const usuariosRepository_1 = require("../repositories/usuariosRepository");
const ApiError_1 = require("../utils/ApiError");
const getUsuariosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield (0, usuariosRepository_1.getUsuarios)();
    return usuarios;
});
exports.getUsuariosService = getUsuariosService;
const getUsuariosByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield (0, usuariosRepository_1.getUsuarioById)(id);
    if (!usuario)
        throw new ApiError_1.ApiError('Usuario no encontrado');
    return usuario;
});
exports.getUsuariosByIdService = getUsuariosByIdService;
const createUsuariosService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoUsuario = yield (0, usuariosRepository_1.createUsuario)(userData);
    return { message: 'Usuario creado', data: nuevoUsuario };
});
exports.createUsuariosService = createUsuariosService;
const updateUsuariosService = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const actualizado = yield (0, usuariosRepository_1.updateUsuario)(id, userData);
    return { message: 'Actualizado Usuario', data: actualizado };
});
exports.updateUsuariosService = updateUsuariosService;
const deleteUsuariosService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const borrado = yield (0, usuariosRepository_1.deleteUsuario)(id);
    return { message: 'Usuario borrado', data: borrado };
});
exports.deleteUsuariosService = deleteUsuariosService;
