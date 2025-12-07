import { eq } from "drizzle-orm";
import { db, isDbAvailable } from "~/db";
import { siteContentTable, type SiteContent, type SiteNotification } from "~/db/schema";

export async function getSiteContent(): Promise<SiteContent | undefined> {
  try {
    if (!isDbAvailable()) {
      console.warn("database is not available");
      return undefined;
    }

    const content = await db.query.siteContentTable.findFirst({
      where: eq(siteContentTable.id, "default"),
    });
    return content;
  } catch (error) {
    console.error("error fetching site content:", error);
    return undefined;
  }
}

export async function getActiveNotifications(): Promise<SiteNotification[]> {
  try {
    const content = await getSiteContent();
    if (!content) return [];
    
    return content.notifications?.filter((n) => n.isActive) ?? [];
  } catch (error) {
    console.error("error fetching active notifications:", error);
    return [];
  }
}

export async function updateSiteContent(
  updates: Partial<Omit<SiteContent, "id">>,
  updatedBy?: string
): Promise<SiteContent> {
  const now = new Date();
  
  const [updated] = await db
    .update(siteContentTable)
    .set({
      ...updates,
      updatedAt: now,
      updatedBy: updatedBy ?? null,
    })
    .where(eq(siteContentTable.id, "default"))
    .returning();

  if (!updated) {
    throw new Error("Failed to update site content");
  }

  return updated;
}

export async function getHeroContent() {
  const content = await getSiteContent();
  if (!content) {
    return {
      heroHeading: "Välkommen till",
      heroSubheading: "Vårt Bageri",
      heroDescription: "Upptäck våra halalcertifierade bakverk, bakade med kärlek och omsorg varje dag.",
    };
  }

  return {
    heroHeading: content.heroHeading,
    heroSubheading: content.heroSubheading,
    heroDescription: content.heroDescription,
  };
}

