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
    const result = await db.insert(siteContentTable).values({
      id: "default",
      notifications: [],
      heroHeading: "Välkommen till",
      heroSubheading: "Vårt Bageri",
      heroDescription: "Upptäck våra halalcertifierade bakverk, bakade med kärlek och omsorg varje dag.",
    }).returning();

    console.log("✓ site content seeded successfully");
    console.log("  initialized with default hero content");
  } catch (error) {
    // don't fail the build if we can't connect to the database
    // the app has fallback defaults for missing content and an init endpoint
    console.warn("⚠ could not seed site content (database may not be available during build)");
    console.warn("  this is expected on Vercel - the app will use default values");
    console.warn("  you can initialize content manually via the admin panel");
  }
}

seedSiteContent()
  .then(() => process.exit(0))
  .catch(() => process.exit(0)); // always exit successfully

