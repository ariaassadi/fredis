import { db, isDbAvailable } from "~/db";
import { siteContentTable } from "~/db/schema";

export async function POST() {
  try {
    // check if database is available
    if (!isDbAvailable()) {
      console.error("database is not available");
      return Response.json(
        { error: "database connection not available" },
        { status: 503 }
      );
    }

    // check if content already exists
    const existing = await db.query.siteContentTable.findFirst();

    if (existing) {
      return Response.json(
        { message: "site content already initialized", data: existing },
        { status: 200 }
      );
    }

    // insert default content
    const result = await db
      .insert(siteContentTable)
      .values({
        id: "default",
        notifications: [],
        heroHeading: "Välkommen till",
        heroSubheading: "Vårt Bageri",
        heroDescription:
          "Upptäck våra halalcertifierade bakverk, bakade med kärlek och omsorg varje dag.",
      })
      .returning();

    if (!result || result.length === 0) {
      throw new Error("no result returned from insert");
    }

    return Response.json(
      { message: "site content initialized successfully", data: result[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("failed to initialize site content:", error);
    const errorMessage = error instanceof Error ? error.message : "unknown error";
    return Response.json(
      { error: "failed to initialize site content", details: errorMessage },
      { status: 500 }
    );
  }
}

