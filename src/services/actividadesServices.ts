import { Actividad } from '../entities/Actividades';
import {
  getActividads,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
} from '../repositories/actividadesRepository';

export const getActividadesService = async () => {
  const actividades = await getActividads();
  if (actividades.length === 0)
    throw new Error('No hay actividades para mostrar');
  return actividades;
};

export const getActividadesByIdService = async (id: string, rol: string) => {

  if (rol === 'admin') {
    const actividades = await getActividads();
    return actividades;
  }

  const actividades = await getActividadById(id);
  if (actividades.length === 0)
    throw new Error('No hay actividades para mostrar');
  return actividades;
};

export const createActividadesService = async (
  ActividadData: Partial<Actividad>,
) => {
  const actividadCreada = await createActividad(ActividadData);
  return actividadCreada;
};

export const updateActividadesService = async (
  id: string,
  ActividadData: Partial<Actividad>,
) => {
  const actividadActualizada = await updateActividad(id, ActividadData);
  return actividadActualizada;
};

export const deleteActividadesService = async (id: string) => {
  const actividadBorrada = await deleteActividad(id);
  return actividadBorrada;
};
