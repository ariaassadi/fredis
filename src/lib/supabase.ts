import { createClient, type SupabaseClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL) {
  console.error("🔴 SUPABASE_URL environment variable is not set");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("🔴 SUPABASE_SERVICE_ROLE_KEY environment variable is not set");
}

// Supabase client for storage operations - null if env vars not set
export const supabase: SupabaseClient | null =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

export const isSupabaseAvailable = () => !!supabase;

