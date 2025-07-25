"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadesRoutes_1 = __importDefault(require("./actividadesRoutes"));
const clientesRoutes_1 = __importDefault(require("./clientesRoutes"));
const metasRoutes_1 = __importDefault(require("./metasRoutes"));
const oportunidadesRoutes_1 = __importDefault(require("./oportunidadesRoutes"));
const pedidosRoutes_1 = __importDefault(require("./pedidosRoutes"));
const productosRoutes_1 = __importDefault(require("./productosRoutes"));
const productos_pedidoRoutes_1 = __importDefault(require("./productos_pedidoRoutes"));
const reunionesRoutes_1 = __importDefault(require("./reunionesRoutes"));
const ticketsRoutes_1 = __importDefault(require("./ticketsRoutes"));
const usuariosRoutes_1 = __importDefault(require("./usuariosRoutes"));
// import turnRoutes from "./turnRoutes"
const router = (0, express_1.Router)();
router.use('/', actividadesRoutes_1.default);
router.use('/', clientesRoutes_1.default);
router.use('/', metasRoutes_1.default);
router.use('/', oportunidadesRoutes_1.default);
router.use('/', pedidosRoutes_1.default);
router.use('/', productosRoutes_1.default);
router.use('/', productos_pedidoRoutes_1.default);
router.use('/', reunionesRoutes_1.default);
router.use('/', ticketsRoutes_1.default);
router.use('/', usuariosRoutes_1.default);
exports.default = router;
