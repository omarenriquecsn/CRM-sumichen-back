import { Notificacion } from "../entities/Notificaiones";
import { TipoNotificacionEnum } from "../enums/TipoNotificaionEnum";
import { crearNotificacionRepository, eliminarNotificacion, marcarNotificacionComoLeida, obtenerNotificacionesPorUsuario } from "../repositories/notificaionesRepository";

export const crearNotificacion = (notificacion: Partial<Notificacion>) => (usuarioId: string, descripcion: string, tipo: TipoNotificacionEnum) => {
  // Llama al repositorio para guardar la notificación
  return crearNotificacionRepository({ vendedor_id: usuarioId, descripcion: descripcion, tipo: tipo });

};
export const obtenerNotificaciones = (usuarioId: string) => {
  // Llama al repositorio para traer las notificaciones del usuario
  return obtenerNotificacionesPorUsuario(usuarioId);
};

 export const marcarNotificacionComoLeidaService = (id: string) => {
  return marcarNotificacionComoLeida(id);
};

export const eliminarNotificacionService = (id: string) => {
  return eliminarNotificacion(id);
};