import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import type { SiteNotification } from "./types";

export const siteContentTable = pgTable("site_content", {
  id: text("id").primaryKey().default("default"),
  notifications: jsonb("notifications").$type<SiteNotification[]>().notNull().default([]),
  heroHeading: text("hero_heading").notNull(),
  heroSubheading: text("hero_subheading").notNull(),
  heroDescription: text("hero_description").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  updatedBy: text("updated_by"),
});

