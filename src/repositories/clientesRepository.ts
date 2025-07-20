import { AppDataSource } from '../config/dataBaseConfig';
import { EstadoClienteEnum } from '../enums/EstadoClienteEnum';
import { Cliente } from '../entities/Clientes';

export const getClientes = async () => {
  const ClienteRepository = AppDataSource.getRepository(Cliente);
  return await ClienteRepository.find();
};

export const getClienteById = async (id: string) => {
  const ClienteRepository = AppDataSource.getRepository(Cliente);
  return await ClienteRepository.find({ where: { vendedor_id: id } });
};

export const createCliente = async (ClienteData: Partial<Cliente>) => {
  const ClienteRepository = AppDataSource.getRepository(Cliente);
  const newCliente = ClienteRepository.create(ClienteData);
  return await ClienteRepository.save(newCliente);
};

export const updateCliente = async (
  id: string,
  ClienteData: Partial<Cliente>,
) => {
  if (!ClienteData || Object.keys(ClienteData).length === 0) {
    throw new Error('No se proporcionaron datos para actualizar al cliente.');
  }

  console.log(ClienteData)
  const ClienteRepository = AppDataSource.getRepository(Cliente);
  await ClienteRepository.update(id, ClienteData);
  return await ClienteRepository.findOneBy({ id });
};

export const deleteCliente = async (id: string) => {
  const ClienteRepository = AppDataSource.getRepository(Cliente);
  return await ClienteRepository.update(id, {
    estado: EstadoClienteEnum.INACTIVO,
  });
};
