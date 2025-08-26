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
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.getUsuarioById = exports.getUsuarios = void 0;
const usuariosServices_1 = require("../services/usuariosServices");
const ApiError_1 = require("../utils/ApiError");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield (0, usuariosServices_1.getUsuariosService)();
    if (usuarios.length === 0)
        throw new ApiError_1.ApiError('No hay usuarios disponibles');
    res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield (0, usuariosServices_1.getUsuariosByIdService)(id);
    if (!usuario)
        throw new ApiError_1.ApiError('Usuario no encontrado', 404);
    res.json(usuario);
});
exports.getUsuarioById = getUsuarioById;
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoUsuario = yield (0, usuariosServices_1.createUsuariosService)(req.body);
    if (!nuevoUsuario)
        throw new ApiError_1.ApiError('No se pudo crear el usuario', 400);
    res.status(201).json(nuevoUsuario);
});
exports.createUsuario = createUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const actualizado = yield (0, usuariosServices_1.updateUsuariosService)(id, req.body);
    if (!actualizado)
        throw new ApiError_1.ApiError('No se pudo actualizar el usuario', 400);
    res.json(actualizado);
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const borrado = yield (0, usuariosServices_1.deleteUsuariosService)(id);
    if (!borrado)
        throw new ApiError_1.ApiError('No se pudo eliminar el usuario', 400);
    res.status(204).send();
});
exports.deleteUsuario = deleteUsuario;
