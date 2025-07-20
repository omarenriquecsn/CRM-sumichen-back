import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

const getUsuarioDesdeToken = async (accessToken: string) => {
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) throw new Error(`Token inválido: ${error.message}`);
  return data; // ← Aquí tienes el usuario completo
};