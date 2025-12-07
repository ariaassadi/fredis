import { db } from "~/db";
import { siteContentTable } from "~/db/schema";

export async function POST() {
  try {
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

    return Response.json(
      { message: "site content initialized successfully", data: result[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("failed to initialize site content:", error);
    return Response.json(
      { error: "failed to initialize site content" },
      { status: 500 }
    );
  }
}

