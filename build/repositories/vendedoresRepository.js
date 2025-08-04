'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteUsuario =
  exports.updateUsuario =
  exports.createUsuario =
  exports.getUsuarioById =
  exports.getUsuarios =
    void 0;
const dataBaseConfig_1 = require('../config/dataBaseConfig');
const Vendedores_1 = require('../entities/Vendedores');
const getUsuarios = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = dataBaseConfig_1.AppDataSource.getRepository(
      Vendedores_1.Vendedor,
    );
    return yield userRepository.find();
  });
exports.getUsuarios = getUsuarios;
const getUsuarioById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = dataBaseConfig_1.AppDataSource.getRepository(
      Vendedores_1.Vendedor,
    );
    return yield userRepository.findOneBy({ id });
  });
exports.getUsuarioById = getUsuarioById;
const createUsuario = (userData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = dataBaseConfig_1.AppDataSource.getRepository(
      Vendedores_1.Vendedor,
    );
    const newUser = userRepository.create(userData);
    return yield userRepository.save(newUser);
  });
exports.createUsuario = createUsuario;
const updateUsuario = (id, userData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = dataBaseConfig_1.AppDataSource.getRepository(
      Vendedores_1.Vendedor,
    );
    yield userRepository.update(id, userData);
    return yield userRepository.findOneBy({ id });
  });
exports.updateUsuario = updateUsuario;
const deleteUsuario = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = dataBaseConfig_1.AppDataSource.getRepository(
      Vendedores_1.Vendedor,
    );
    return yield userRepository.delete(id);
  });
exports.deleteUsuario = deleteUsuario;
