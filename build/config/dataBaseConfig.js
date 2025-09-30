"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Vendedores_1 = require("../entities/Vendedores");
const Tickets_1 = require("../entities/Tickets");
const Actividades_1 = require("../entities/Actividades");
const Reuniones_1 = require("../entities/Reuniones");
const Oportunidades_1 = require("../entities/Oportunidades");
const Pedidos_1 = require("../entities/Pedidos");
const Productos_1 = require("../entities/Productos");
const Productos_pedido_1 = require("../entities/Productos_pedido");
const Metas_1 = require("../entities/Metas");
const Clientes_1 = require("../entities/Clientes");
const Notificaiones_1 = require("../entities/Notificaiones");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [
        Vendedores_1.Vendedor,
        Tickets_1.Ticket,
        Actividades_1.Actividad,
        Reuniones_1.Reunion,
        Oportunidades_1.Oportunidad,
        Pedidos_1.Pedido,
        Productos_1.Producto,
        Productos_pedido_1.ProductosPedido,
        Metas_1.Meta,
        Clientes_1.Cliente,
        Notificaiones_1.Notificacion,
    ],
    migrations: ['src/database/migrations/**/*.ts'],
    dropSchema: false,
});
