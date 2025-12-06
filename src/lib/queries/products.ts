import { eq, sql } from "drizzle-orm";

import { db } from "~/db";
import { productsTable } from "~/db/schema/products/tables";
import type { Product, NewProduct } from "~/db/schema/products/types";

/**
 * Get all products from the database (including disabled ones)
 */
export async function getAllProducts(): Promise<Product[]> {
  const products = await db.select().from(productsTable);

  return products.map((product) => ({
    ...product,
    price: Number.parseFloat(product.price),
    originalPrice: product.originalPrice
      ? Number.parseFloat(product.originalPrice)
      : null,
  })) as Product[];
}

/**
 * Get all products excluding disabled ones
 */
export async function getActiveProducts(): Promise<Product[]> {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isDisabled, false));

  return products.map((product) => ({
    ...product,
    price: Number.parseFloat(product.price),
    originalPrice: product.originalPrice
      ? Number.parseFloat(product.originalPrice)
      : null,
  })) as Product[];
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id))
    .limit(1);

  if (!product) {
    return null;
  }

  return {
    ...product,
    price: Number.parseFloat(product.price),
    originalPrice: product.originalPrice
      ? Number.parseFloat(product.originalPrice)
      : null,
  } as Product;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, category));

  return products.map((product) => ({
    ...product,
    price: Number.parseFloat(product.price),
    originalPrice: product.originalPrice
      ? Number.parseFloat(product.originalPrice)
      : null,
  })) as Product[];
}

/**
 * Get featured products (currently returns all products, can be customized)
 */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isDisabled, false))
    .limit(limit);

  return products.map((product) => ({
    ...product,
    price: Number.parseFloat(product.price),
    originalPrice: product.originalPrice
      ? Number.parseFloat(product.originalPrice)
      : null,
  })) as Product[];
}

/**
 * Get distinct categories from products
 */
export async function getProductCategories(): Promise<string[]> {
  const result = await db
    .selectDistinct({ category: productsTable.category })
    .from(productsTable)
    .where(eq(productsTable.isDisabled, false));

  return result.map((row) => row.category).sort();
}

/**
 * Create a new product
 */
export async function createProduct(product: NewProduct): Promise<Product> {
  const [newProduct] = await db
    .insert(productsTable)
    .values(product)
    .returning();

  return {
    ...newProduct,
    price: Number.parseFloat(newProduct.price),
    originalPrice: newProduct.originalPrice
      ? Number.parseFloat(newProduct.originalPrice)
      : null,
  } as Product;
}

/**
 * Update an existing product
 */
export async function updateProduct(
  id: string,
  product: Partial<NewProduct>,
): Promise<Product | null> {
  const [updatedProduct] = await db
    .update(productsTable)
    .set({
      ...product,
      updatedAt: new Date(),
    })
    .where(eq(productsTable.id, id))
    .returning();

  if (!updatedProduct) {
    return null;
  }

  return {
    ...updatedProduct,
    price: Number.parseFloat(updatedProduct.price),
    originalPrice: updatedProduct.originalPrice
      ? Number.parseFloat(updatedProduct.originalPrice)
      : null,
  } as Product;
}

/**
 * Disable a product (soft delete)
 */
export async function disableProduct(id: string): Promise<Product | null> {
  return updateProduct(id, { isDisabled: true });
}

/**
 * Enable a product
 */
export async function enableProduct(id: string): Promise<Product | null> {
  return updateProduct(id, { isDisabled: false });
}

/**
 * Delete a product permanently
 */
export async function deleteProduct(id: string): Promise<void> {
  await db.delete(productsTable).where(eq(productsTable.id, id));
}
