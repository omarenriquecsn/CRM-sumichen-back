import { CrearPedidoDto } from '../dtos/CrearPedidoDto';
import { Pedido } from '../entities/Pedidos';
import {
  getPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
} from '../repositories/pedidosRepository';
import { createProductosPedido } from '../repositories/producto_pedidoRepository';

export const getPedidosService = async () => {
  const pedidos = await getPedidos();
  return pedidos;
};

export const getPedidosByVendedorService = async (id: string) => {
  const pedidos = await getPedidos();
  return pedidos.filter((pedido) => pedido.vendedor_id === id);
}

export const getPedidosByIdService = async (id: string) => {
  const pedido = await getPedidoById(id);
  return pedido;
};

export const createPedidosService = async (pedidoData: CrearPedidoDto) => {
  const { productos, ...rest } = pedidoData;

  const neuevoPedido = {
    ...rest,
    impuestos: rest.impuestos === 'exento' ? 0 : 0.16,
    subtotal: productos.reduce(
      (acc, producto) => acc + producto.precio_unitario * producto.cantidad,
      0,
    ),
    total: 0,
  };

  neuevoPedido.total = neuevoPedido.subtotal * (neuevoPedido.impuestos + 1);

  const pedido = await createPedido(neuevoPedido);

  if (!pedido) {
    throw new Error('Error al crear el pedido');
  }

  const productosPedido = productos.map((producto) => ({
    ...producto,
    pedido_id: pedido.id,
    total: producto.precio_unitario * producto.cantidad,
  }));

  await Promise.all(
    productosPedido.map(async (producto) => {
      await createProductosPedido(producto);
    }),
  );

  return pedido;
};

export const updatePedidosService = async (
  id: string,
  pedidoData: Partial<Pedido>,
) => {
  const pedidoActualizado = await updatePedido(id, pedidoData);
  return pedidoActualizado;
};

export const deletePedidosService = async (id: string) => {
  const pedidoBorrado = await deletePedido(id);
  return pedidoBorrado;
};
