import { Request, Response } from 'express';
import {
  getPedidosService,
  getPedidosByIdService,
  createPedidosService,
  updatePedidosService,
  deletePedidosService,
  getPedidosByVendedorService,
} from '../services/pedidosServices';
import { ApiError } from '../utils/ApiError';

export const getPedidos = async (req: Request, res: Response) => {
  const pedidos = await getPedidosService();
  if (pedidos.length === 0) throw new ApiError('No hay pedidos registrados');
  res.json(pedidos);
};

export const getPedidoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pedido = await getPedidosByIdService(id);
  if (!pedido) throw new ApiError('Pedido no encontrado', 404);
  res.json(pedido);
};

export const getPedidosByVendedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pedidos = await getPedidosByVendedorService(id);
  if (pedidos.length === 0) throw new ApiError('No hay pedidos disponibles');
  res.json(pedidos);
}

export const createPedido = async (req: Request, res: Response) => {
  const nuevoPedido = await createPedidosService(req.body);
  if (!nuevoPedido) throw new ApiError('Error al crear el pedido', 400);
  res.status(201).json(nuevoPedido);
};

export const updatePedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const actualizado = await updatePedidosService(id, req.body);
  if (!actualizado) throw new ApiError('No se pudo actualizar el pedido', 400);
  res.json(actualizado);
};

export const deletePedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const borrado = await deletePedidosService(id);
  if (!borrado) throw new ApiError('No se pudo eliminar el pedido', 400);
  res.status(204).send();
};
