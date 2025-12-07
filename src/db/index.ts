import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { DB_DEV_LOGGER } from "~/app";

import * as schema from "./schema";

// warn if DATABASE_URL is not set but don't crash the app
if (!process.env.DATABASE_URL) {
  console.error(
    "🔴 DATABASE_URL environment variable is not set. " +
    "Get your PostgreSQL connection string from Supabase Dashboard > Settings > Database > Connection string > URI"
  );
}

/**
 * Caches the database connection in development to
 * prevent creating a new connection on every HMR update.
 */
type DbConnection = ReturnType<typeof postgres>;
const globalForDb = globalThis as unknown as {
  conn?: DbConnection;
};

// only create connection if DATABASE_URL is set
export const conn: DbConnection | null = process.env.DATABASE_URL
  ? (globalForDb.conn ?? postgres(process.env.DATABASE_URL))
  : null;

if (process.env.NODE_ENV !== "production" && conn) {
  globalForDb.conn = conn;
}

// Database connection instance - will be null if no DATABASE_URL
export const db = conn
  ? drizzle(conn, {
      logger: DB_DEV_LOGGER && process.env.NODE_ENV !== "production",
      schema,
    })
  : null as unknown as ReturnType<typeof drizzle<typeof schema>>;

// helper to check if db is available
export const isDbAvailable = () => !!conn;
