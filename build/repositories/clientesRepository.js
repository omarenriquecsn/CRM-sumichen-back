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
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClienteById = exports.getClientes = void 0;
const dataBaseConfig_1 = require("../config/dataBaseConfig");
const EstadoClienteEnum_1 = require("../enums/EstadoClienteEnum");
const Clientes_1 = require("../entities/Clientes");
const getClientes = () => __awaiter(void 0, void 0, void 0, function* () {
    const ClienteRepository = dataBaseConfig_1.AppDataSource.getRepository(Clientes_1.Cliente);
    return yield ClienteRepository.find();
});
exports.getClientes = getClientes;
const getClienteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ClienteRepository = dataBaseConfig_1.AppDataSource.getRepository(Clientes_1.Cliente);
    return yield ClienteRepository.find({ where: { vendedor_id: id } });
});
exports.getClienteById = getClienteById;
const createCliente = (ClienteData) => __awaiter(void 0, void 0, void 0, function* () {
    const ClienteRepository = dataBaseConfig_1.AppDataSource.getRepository(Clientes_1.Cliente);
    const newCliente = ClienteRepository.create(ClienteData);
    return yield ClienteRepository.save(newCliente);
});
exports.createCliente = createCliente;
const updateCliente = (id, ClienteData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ClienteData || Object.keys(ClienteData).length === 0) {
        throw new Error('No se proporcionaron datos para actualizar al cliente.');
    }
    console.log(ClienteData);
    const ClienteRepository = dataBaseConfig_1.AppDataSource.getRepository(Clientes_1.Cliente);
    yield ClienteRepository.update(id, ClienteData);
    return yield ClienteRepository.findOneBy({ id });
});
exports.updateCliente = updateCliente;
const deleteCliente = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ClienteRepository = dataBaseConfig_1.AppDataSource.getRepository(Clientes_1.Cliente);
    return yield ClienteRepository.update(id, {
        estado: EstadoClienteEnum_1.EstadoClienteEnum.INACTIVO,
    });
});
exports.deleteCliente = deleteCliente;
