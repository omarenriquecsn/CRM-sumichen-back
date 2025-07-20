import { Reunion } from "../entities/Reuniones";
import { getReunions, getReunionById, createReunion, updateReunion, deleteReunion } from "../repositories/reunionesRepository";


export const getReunionesService = async () => {
  const reunions = await getReunions();
  return reunions;
};

export const getReunionesByVendedorService = async (id: string) => {
  const reuniones = await getReunions();
  return reuniones.filter((reunion) => reunion.vendedor_id === id);
}

export const getReunionesByIdService = async (id: string) => {
 const reunion = await getReunionById(id);
 return reunion;
};

export const createReunionesService = async ( ReunionData: Partial<Reunion>) => {
  const neuvaReunion = await createReunion(ReunionData);
  return neuvaReunion;
};

export const updateReunionesService = async (id: string, reunionData: Partial<Reunion>) => {
  const reunionActualizada = await updateReunion(id, reunionData);
  return reunionActualizada;
};

export const deleteReunionesService = async (id: string) => {
  const reunionBorrada = await deleteReunion(id);
  return reunionBorrada;
};
