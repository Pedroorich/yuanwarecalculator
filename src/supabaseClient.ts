import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicialização segura do cliente Supabase
// Forçamos o uso do fetch nativo via uma função anônima para evitar que 
// qualquer biblioteca interna tente redefinir window.fetch
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: (...args) => {
          const fetchFn = (typeof window !== 'undefined' ? window.fetch : globalThis.fetch);
          return fetchFn(...args);
        },
      },
    })
  : null as unknown as SupabaseClient;

export const getSupabase = (): SupabaseClient => {
  if (!supabase) {
    throw new Error('Supabase não configurado. Verifique as variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};
