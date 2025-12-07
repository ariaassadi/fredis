import type { Product } from "~/db/schema/products/types";
import { getAllProducts } from "~/lib/queries/products";
import { ProductsPage } from "~/ui/components/pages/products/products-page";

export const dynamic = "force-dynamic";

export default async function Page() {
  let products: Product[] = [];
  
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
  
  return <ProductsPage initialProducts={products} />;
}
