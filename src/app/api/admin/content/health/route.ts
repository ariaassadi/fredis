import { isDbAvailable } from "~/db";

export async function GET() {
  const dbAvailable = isDbAvailable();
  const databaseUrl = process.env.DATABASE_URL ? "set" : "not set";
  const nodeEnv = process.env.NODE_ENV;

  console.log("[health] database available:", dbAvailable);
  console.log("[health] database url:", databaseUrl);
  console.log("[health] node env:", nodeEnv);

  return Response.json({
    status: "ok",
    database: {
      available: dbAvailable,
      urlConfigured: databaseUrl,
    },
    environment: nodeEnv,
    timestamp: new Date().toISOString(),
  });
}

