import { Cliente } from "../entities/Clientes";
import { getClienteById, getClientes, createCliente, updateCliente, deleteCliente } from "../repositories/clientesRepository";
import { updateMetasClientesService } from "./metasServices";

export const getClientesService = async () => {
  const clientes = await getClientes();
  return clientes;
};

export const getClientesVendedorService = async (id: string) => {
  const clientes = await getClientes();
  return clientes.filter((cliente) => cliente.vendedor_id === id);
}

export const getClientesByIdService = async (id: string) => {
  const cliente = await getClienteById(id);
  return cliente;
};

export const createClientesService = async (clienteData: Partial<Cliente>) => {
  const nuevoCliente = await createCliente(clienteData);
  const mesActual = new Date().getMonth() + 1
  updateMetasClientesService(nuevoCliente.vendedor_id, 'clientes_actuales', 1, mesActual)
  return nuevoCliente;
};

export const updateClientesService = async (id: string, clienteData: Partial<Cliente>) => {
  const clienteActualizado = await updateCliente(id, clienteData);
  return {
    message: 'Cliente actualizado',
    data: clienteActualizado,
  };
};

export const deleteClientesService = async (id: string) => {
  const clienteEliminado = await deleteCliente(id);
  return {
    message: 'Cliente eliminado',
    data: clienteEliminado,
  };  
};
