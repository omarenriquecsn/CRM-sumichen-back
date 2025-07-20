import { Request, Response } from 'express';
import {
  getClientesService,
  getClientesByIdService,
  createClientesService,
  updateClientesService,
  deleteClientesService,
} from '../services/clientesServices';
import { ApiError } from '../utils/ApiError';

export const getClientes = async (req: Request, res: Response) => {
  const clientes = await getClientesService();
  if (clientes.length === 0) throw new ApiError('No hay clientes para mostrar');
  res.json(clientes);
};

export const getClientesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cliente = await getClientesByIdService(id);

  if (!cliente) throw new ApiError('Cliente no encontrado', 404);

  res.json(cliente);
};

export const createClientes = async (req: Request, res: Response) => {
  const nuevoCliente = await createClientesService(req.body);

  if (!nuevoCliente) throw new ApiError('No se ha creado el cliente', 400);

  res.status(201).json(nuevoCliente);
};

export const updateClientes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clienteActualizado = await updateClientesService(id, req.body);

  if (!clienteActualizado)
    throw new ApiError('No se actualizó el cliente', 400);

  res.json(clienteActualizado);
};

export const deleteClientes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clienteBorrado = await deleteClientesService(id);

  if (!clienteBorrado) throw new ApiError('No se ha borrado el cliente', 400);

  res.status(204).send();
};
