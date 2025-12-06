import { relations } from "drizzle-orm";

import { productsTable } from "./tables";

// relations for products table
export const productsRelations = relations(productsTable, () => ({}));
