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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescargasMetasService = exports.getDescargasActividadesService = exports.getDescargasReunionesService = exports.getDescargasClientesService = exports.getDescargasPedidosService = void 0;
const exportActividades_1 = __importDefault(require("../utils/exportActividades"));
const exportClientes_1 = __importDefault(require("../utils/exportClientes"));
const exportMetas_1 = require("../utils/exportMetas");
const exportPedidos_1 = require("../utils/exportPedidos");
const exportReuniones_1 = __importDefault(require("../utils/exportReuniones"));
const getDescargasPedidosService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exportPedidos_1.exportPedidosToExcel)();
});
exports.getDescargasPedidosService = getDescargasPedidosService;
const getDescargasClientesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exportClientes_1.default)();
});
exports.getDescargasClientesService = getDescargasClientesService;
const getDescargasReunionesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exportReuniones_1.default)();
});
exports.getDescargasReunionesService = getDescargasReunionesService;
const getDescargasActividadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exportActividades_1.default)();
});
exports.getDescargasActividadesService = getDescargasActividadesService;
const getDescargasMetasService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exportMetas_1.exportMetasToExcel)();
});
exports.getDescargasMetasService = getDescargasMetasService;
