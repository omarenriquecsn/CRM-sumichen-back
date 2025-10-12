import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const getUsuarioDesdeToken = async (accessToken: string) => {
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) throw new Error(`Token inválido: ${error.message}`);
  return data; // ← Aquí tienes el usuario completo
};

export async function deleteOldEvidencias(days = 60): Promise<{
  message: string;
  attempted?: number;
  deleted?: number;
  errors?: any[];
  error?: string;
}> {
  const bucket = 'evidencias';
  const limit = 1000;
  let offset = 0;
  const threshold = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const toDelete: string[] = [];
  try {
    while (true) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list('', { limit, offset, sortBy: { column: 'created_at', order: 'asc' } });
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) break;

      for (const item of data) {
        // item.created_at puede venir como string; si no existe, probar updated_at
        const createdAtStr = (item as any).created_at ?? (item as any).updated_at;
        if (!createdAtStr) continue;
        const createdAt = new Date(createdAtStr);
        if (isNaN(createdAt.getTime())) continue;
        if (createdAt < threshold) {
          // usa item.name como path relativo en el bucket
          toDelete.push(item.name);
        }
      }

      offset += data.length;
      if (data.length < limit) break;
    }

    if (toDelete.length === 0) {
      return { message: 'No hay archivos antiguos para eliminar', deleted: 0 };
    }

    // borrar en chunks (por ejemplo 100 por petición)
    const chunkSize = 100;
    let deletedCount = 0;
    const errors: any[] = [];
    for (let i = 0; i < toDelete.length; i += chunkSize) {
      const chunk = toDelete.slice(i, i + chunkSize);
      const { error } = await supabase.storage.from(bucket).remove(chunk);
      if (error) {
        errors.push({ chunk, message: error.message });
      } else {
        deletedCount += chunk.length;
      }
    }

    return { message: 'Proceso completado', attempted: toDelete.length, deleted: deletedCount, errors };
  } catch (err: any) {
    return { message: 'Error durante limpieza', error: err.message };
  }
}
// Declaraciones mínimas para suprimir el error de "implicit any"
