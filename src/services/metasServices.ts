import { Meta } from '../entities/Metas';
import {
  getMetas,
  getMetaById,
  createMeta,
  updateMeta,
  deleteMeta,
} from '../repositories/metasRepository';
import { getPedidosByVendedorService } from './pedidosServices';
import { getClientesVendedorService } from './clientesServices';

export const getMetasService = async () => {
  const metas = await getMetas();
  return metas;
};

export const getMetasByIdService = async (id: string) => {
  const meta = await getMetaById(id);
  return meta;
};

export const createMetasService = async (metaData: Partial<Meta>) => {

  if(!metaData.vendedor_id) throw new Error('No se ha proporcionado un vendedor');
  const vendedorPedidos = await getPedidosByVendedorService(metaData.vendedor_id);
  const pedidosFiltrados = vendedorPedidos.filter(
    (pedido) => pedido.estado === 'procesado',
  );

  const clientes = await getClientesVendedorService(metaData.vendedor_id);
  const clientesFiltrados = clientes.filter(
    (cliente) => cliente.estado === 'activo',
  );

  const metaActualizada = {
    ...metaData,
    ventas_actuales: vendedorPedidos.reduce(
      (acc, pedido) => acc + pedido.total,
      0,
    ),
    clientes_actuales: clientesFiltrados.length,
  };
  const nuevaMeta = await createMeta(metaActualizada);

  return nuevaMeta;
};

export const updateMetasClientesService = async (
  id: string,
  accion: 'ventas_actuales' | 'clientes_actuales',
  valor: number,
  mes: number
) => {
  const metas= await getMetasByIdService(id)

metas.map(async(meta) => {
  if(meta.mes === mes){

    meta[accion] = valor
    await updateMeta(id, meta)
  }
})
}


export const updateMetasService = async (
  id: string,
  metaData: Partial<Meta>,
) => {
  const metaActualizada = await updateMeta(id, metaData);
  return metaActualizada;
};

export const deleteMetasService = async (id: string) => {
  const metaBorrada = await deleteMeta(id);
  return metaBorrada;
};
