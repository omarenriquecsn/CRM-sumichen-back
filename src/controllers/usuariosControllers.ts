import { Request, Response } from 'express';
import {
  getUsuariosService,
  getUsuariosByIdService,
  createUsuariosService,
  updateUsuariosService,
  deleteUsuariosService,
} from '../services/usuariosServices';
import { ApiError } from '../utils/ApiError';
import { Vendedor } from '../entities/Vendedores';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await getUsuariosService();
  if (usuarios.length === 0) throw new ApiError('No hay usuarios disponibles');
  res.json(usuarios);
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await getUsuariosByIdService(id);
  if (!usuario) throw new ApiError('Usuario no encontrado', 404);
  res.json(usuario);
};

export const createUsuario = async (req: Request, res: Response) => {
  const nuevoUsuario = await createUsuariosService(req.body);
  if (!nuevoUsuario) throw new ApiError('No se pudo crear el usuario', 400);
  res.status(201).json(nuevoUsuario);
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const actualizado = await updateUsuariosService(id, req.body);
  if (!actualizado) throw new ApiError('No se pudo actualizar el usuario', 400);
  res.json(actualizado);
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const borrado = await deleteUsuariosService(id);
  if (!borrado) throw new ApiError('No se pudo eliminar el usuario', 400);
  res.status(204).send();
};
