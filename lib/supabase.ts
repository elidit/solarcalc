import { createClient } from '@supabase/supabase-js';
import { getRequiredEnvVar } from './env';

let supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (supabase) return supabase;

  const supabaseUrl = getRequiredEnvVar('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = getRequiredEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
}