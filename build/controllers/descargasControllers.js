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
exports.getDescargasMetas = exports.getDescargasActividades = exports.getDescargasReuniones = exports.getDescargasClientes = exports.getDescargasPedidos = void 0;
const descargasServices_1 = require("../services/descargasServices");
const getDescargasPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getDescargas called');
    try {
        const descargas = yield (0, descargasServices_1.getDescargasPedidosService)();
        res.status(200).download(descargas, 'pedidos.xlsx');
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las descargas" });
    }
});
exports.getDescargasPedidos = getDescargasPedidos;
const getDescargasClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getDescargas called');
    try {
        const descargas = yield (0, descargasServices_1.getDescargasClientesService)();
        res.status(200).download(descargas, 'clientes.xlsx');
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las descargas" });
    }
});
exports.getDescargasClientes = getDescargasClientes;
const getDescargasReuniones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getDescargas called');
    try {
        const descargas = yield (0, descargasServices_1.getDescargasReunionesService)();
        res.status(200).download(descargas, 'reuniones.xlsx');
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las descargas" });
    }
});
exports.getDescargasReuniones = getDescargasReuniones;
const getDescargasActividades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getDescargas called');
    try {
        const descargas = yield (0, descargasServices_1.getDescargasActividadesService)();
        res.status(200).download(descargas, 'actividades.xlsx');
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las descargas" });
    }
});
exports.getDescargasActividades = getDescargasActividades;
const getDescargasMetas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getDescargas called');
    try {
        const descargas = yield (0, descargasServices_1.getDescargasMetasService)();
        res.status(200).download(descargas, 'metas.xlsx');
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las descargas" });
    }
});
exports.getDescargasMetas = getDescargasMetas;
