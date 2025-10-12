import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });


const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_CLEANUP_BUCKET || 'evidencia';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in env');
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const getUsuarioDesdeToken = async (accessToken: string) => {
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) throw new Error(`Token inválido: ${error.message}`);
  return data; // ← Aquí tienes el usuario completo
};




/**
 * Elimina archivos del bucket configurado con más de `days` días de antigüedad.
 */
export async function deleteOldEvidencias(days = 60) {
  const threshold = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const toDelete: string[] = [];
  const limit = 1000;
  let offset = 0;

  // Listado paginado
  while (true) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list('', { limit, offset, sortBy: { column: 'created_at', order: 'asc' } as any });

    if (error) throw error;
    if (!data || data.length === 0) break;

    for (const item of data) {
      // created_at puede venir en distintas propiedades según versión; comprobamos varias
      const createdAtStr = (item as any).created_at ?? (item as any).updated_at ?? (item as any).last_modified;
      if (!createdAtStr) continue;
      const createdAt = new Date(createdAtStr);
      if (isNaN(createdAt.getTime())) continue;
      if (createdAt < threshold) toDelete.push(item.name);
    }

    if (data.length < limit) break;
    offset += data.length;
  }

  if (toDelete.length === 0) return { message: 'No old files to delete', deleted: 0, attempted: 0 };

  // Borrar en chunks para evitar peticiones muy grandes
  const chunkSize = 100;
  let deleted = 0;
  const errors: any[] = [];

  for (let i = 0; i < toDelete.length; i += chunkSize) {
    const chunk = toDelete.slice(i, i + chunkSize);
    const { error } = await supabase.storage.from(BUCKET).remove(chunk);
    if (error) {
      errors.push({ chunkCount: chunk.length, message: error.message });
    } else {
      deleted += chunk.length;
    }
  }

  return { message: 'Cleanup finished', attempted: toDelete.length, deleted, errors };
}

// Declaraciones mínimas para suprimir el error de "implicit any"
