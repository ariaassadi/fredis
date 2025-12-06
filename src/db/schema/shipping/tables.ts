import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const shippingProvidersTable = pgTable("shipping_provider", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  standardPrice: integer("standard_price").notNull(), // price in öre (100 öre = 1 kr)
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
