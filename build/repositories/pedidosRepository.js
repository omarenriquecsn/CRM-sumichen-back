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
exports.deletePedido = exports.updatePedido = exports.createPedido = exports.getPedidoById = exports.getPedidos = void 0;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const Pedidos_1 = require("../entities/Pedidos");
const getPedidos = () => __awaiter(void 0, void 0, void 0, function* () {
    const PedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Pedidos_1.Pedido);
    return yield PedidoRepository.find();
});
exports.getPedidos = getPedidos;
const getPedidoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const PedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Pedidos_1.Pedido);
    return yield PedidoRepository.find({ where: { vendedor_id: id },
        relations: ['productos_pedido'],
    });
});
exports.getPedidoById = getPedidoById;
const createPedido = (PedidoData) => __awaiter(void 0, void 0, void 0, function* () {
    const PedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Pedidos_1.Pedido);
    const newPedido = PedidoRepository.create(PedidoData);
    return yield PedidoRepository.save(newPedido);
});
exports.createPedido = createPedido;
const updatePedido = (id, PedidoData) => __awaiter(void 0, void 0, void 0, function* () {
    const PedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Pedidos_1.Pedido);
    yield PedidoRepository.update(id, PedidoData);
    return yield PedidoRepository.findOneBy({ id });
});
exports.updatePedido = updatePedido;
const deletePedido = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const PedidoRepository = dataBaseConfig_1.AppDataSource.getRepository(Pedidos_1.Pedido);
    return yield PedidoRepository.delete(id);
});
exports.deletePedido = deletePedido;
