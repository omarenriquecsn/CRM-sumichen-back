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
import {
  getProductosPedidosByVendedorService,
  deleteProductos_pedidoService,
} from './productos_pedidoServices';

import { sendWhatsappNotification } from '../utils/whatsapp';
import dotenv from 'dotenv';
import { getClientesByIdAuxiliar } from '../repositories/clientesRepository';
import { updateCliente } from '../repositories/clientesRepository';
import sendWhatsAppMessage from '../utils/sendWhatsapp';
import { EstadoClienteEnum } from '../enums/EstadoClienteEnum';
import { EtapaDeVentaEnum } from '../enums/EtapaDeVentaEnum';
dotenv.config();

export const getPedidosService = async () => {
  const pedidos = await getPedidos();
  return pedidos;
};

export const getPedidosByVendedorService = async (id: string, rol?: string) => {
  if (rol === 'admin') {
    const pedidos = await getPedidos();
    return pedidos;
  }
  const pedidos = await getPedidos();
  return pedidos.filter((pedido) => pedido.vendedor_id === id);
};

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

  neuevoPedido.total = neuevoPedido.subtotal;

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



  // Notificación WhatsApp al admin
  const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;

  const cliente = await getClientesByIdAuxiliar(pedido.cliente_id);
  if(cliente && cliente.estado !== 'activo'){
    cliente.estado = EstadoClienteEnum.ACTIVO;
    cliente.etapa_venta = EtapaDeVentaEnum.CERRADO;
    await updateCliente(cliente.id, cliente);
  }
    
  const mensaje = `Nuevo pedido creado: Nro ${pedido.numero}, Cliente: ${cliente?.empresa}, Total: ${pedido.total}`;
  if (adminNumber) {
    try {
      await sendWhatsappNotification(mensaje, adminNumber);
    } catch (error) {
      console.error('No se pudo enviar WhatsApp al admin:', error);
    }
  }

  await sendWhatsAppMessage('pedido')

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
  const productPedido = await getProductosPedidosByVendedorService(id);
  await Promise.all(
    productPedido.map(async (producto) => {
      await deleteProductos_pedidoService(producto.id);
    }),
  );
  const pedidoBorrado = await deletePedido(id);
  return pedidoBorrado;
};
