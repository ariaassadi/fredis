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
    // don't fail the build if we can't connect to the database
    // the app has fallback defaults for missing content
    console.warn("⚠ could not seed site content (database may not be available during build)");
    console.warn("  this is expected on Vercel - the app will use default values");
  }
}

seedSiteContent()
  .then(() => process.exit(0))
  .catch(() => process.exit(0)); // always exit successfully

