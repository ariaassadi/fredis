import type { Product } from "~/db/schema/products/types";

import { getAllProducts } from "~/lib/queries/products";
import AdminProductsPage from "~/ui/components/pages/admin/admin-products-page";

export default async function Page() {
  let products: Product[] = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return <AdminProductsPage products={products} />;
}
