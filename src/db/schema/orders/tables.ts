import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { productsTable } from "../products/tables";

export const ordersTable = pgTable("orders", {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  id: text("id").primaryKey(),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  swishConfirmed: text("swish_confirmed").notNull().default("false"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orderItemsTable = pgTable("order_items", {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  priceAtPurchase: numeric("price_at_purchase", {
    precision: 10,
    scale: 2,
  }).notNull(),
  productId: text("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "restrict" }),
  productName: text("product_name").notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 0 }).notNull(),
});
