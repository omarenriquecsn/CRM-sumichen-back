import { createClient } from '@supabase/supabase-js';
import multer from 'multer';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
const upload = multer();

export const subirEvidencia = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ningún archivo' });
    }
    // Subir archivo a Supabase Storage
    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `pedido_${id}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('evidencias')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });
    if (error) {
      return res.status(500).json({ error: 'Error al subir archivo a Supabase', details: error.message });
    }
    // Construir URL pública
    const { publicUrl } = supabase.storage.from('evidencias').getPublicUrl(fileName).data;
    // Actualizar pedido con la URL
    const actualizado = await updatePedidosService(id, { evidencia_url: publicUrl });
    if (!actualizado) {
      return res.status(500).json({ error: 'No se pudo actualizar el pedido con la evidencia' });
    }
    res.json({ url: publicUrl });
  }
];

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
  if(!pedidos) return []
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
