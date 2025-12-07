import { eq } from "drizzle-orm";
import { db, isDbAvailable } from "~/db";
import { siteContentTable } from "~/db/schema";

export async function POST() {
  try {
    console.log("[init] starting site content initialization");

    // check if database is available
    if (!isDbAvailable()) {
      console.error("[init] database is not available");
      return Response.json(
        { error: "database connection not available" },
        { status: 503 }
      );
    }

    console.log("[init] database is available, checking for existing content");

    // check if content already exists using a simpler query
    let existing;
    try {
      existing = await db.query.siteContentTable.findFirst({
        where: eq(siteContentTable.id, "default"),
      });
      console.log("[init] existing content check result:", existing ? "found" : "not found");
    } catch (queryError) {
      console.error("[init] error checking for existing content:", queryError);
      throw queryError;
    }

    if (existing) {
      console.log("[init] content already exists, returning existing");
      return Response.json(
        { message: "site content already initialized", data: existing },
        { status: 200 }
      );
    }

    console.log("[init] no existing content found, inserting default content");

    // insert default content
    let result;
    try {
      result = await db
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
      console.log("[init] insert result:", result);
    } catch (insertError) {
      console.error("[init] error inserting content:", insertError);
      throw insertError;
    }

    if (!result || result.length === 0) {
      throw new Error("no result returned from insert");
    }

    console.log("[init] content initialized successfully");
    return Response.json(
      { message: "site content initialized successfully", data: result[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("[init] failed to initialize site content:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "";
    console.error("[init] error stack:", errorStack);
    
    return Response.json(
      { 
        error: "failed to initialize site content", 
        details: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}

