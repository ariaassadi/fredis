import { db } from "~/db";
import { siteContentTable } from "~/db/schema";

async function seedSiteContent() {
  console.log("seeding site content...");

  try {
    // check if content already exists
    const existing = await db.query.siteContentTable.findFirst();
    
    if (existing) {
      console.log("✓ site content already exists");
      return;
    }

    // insert default content
    await db.insert(siteContentTable).values({
      id: "default",
      notifications: [],
      heroHeading: "Välkommen till",
      heroSubheading: "Vårt Bageri",
      heroDescription: "Upptäck våra halalcertifierade bakverk, bakade med kärlek och omsorg varje dag.",
    });

    console.log("✓ site content seeded successfully");
  } catch (error) {
    console.error("❌ failed to seed site content:", error);
    throw error;
  }
}

seedSiteContent()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

