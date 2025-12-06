import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { productsTable } from "./tables";

export type NewProduct = InferInsertModel<typeof productsTable>;

export type Product = Omit<ProductRaw, "originalPrice" | "price"> & {
  originalPrice: null | number;
  price: number;
};

type ProductRaw = InferSelectModel<typeof productsTable>;

// predefined features for halal bakery products
export const PRODUCT_FEATURES = [
  "Vegan",
  "Äggfri",
  "Laktosfri",
  "Mjölkfri",
  "Shafi'i-vänligen",
  "Glutenfri",
  "Ekologisk",
  "Sockerfri",
  "Fullkorn",
  "Nötfri",
  "Jordnöttersfri",
] as const;
