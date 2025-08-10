import { Vendedor } from '../entities/Vendedores';
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from '../repositories/usuariosRepository';
import { ApiError } from '../utils/ApiError';

export const getUsuariosService = async () => {
  const usuariosDb = await getUsuarios();
  const usuarios: Vendedor[] = usuariosDb.map((usuario) => {
    return usuario;
  });
  return usuarios;
};

export const getUsuariosByIdService = async (id: string) => {
  const usuario = await getUsuarioById(id);
  if (!usuario) throw new ApiError('Usuario no encontrado');
  return usuario;
};

export const createUsuariosService = async (userData: Partial<Vendedor>) => {
  const nuevoUsuario = await createUsuario(userData);
  return { message: 'Usuario creado', data: nuevoUsuario };
};

export const updateUsuariosService = async (
  id: string,
  userData: Partial<Vendedor>,
) => {
  const actualizado = await updateUsuario(id, userData);
  return { message: 'Actualizado Usuario', data: actualizado };
};

export const deleteUsuariosService = async (id: string) => {
  const borrado = await deleteUsuario(id);
  return { message: 'Usuario borrado', data: borrado };
};
