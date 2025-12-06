import { getAllProducts } from "~/lib/queries/products";
import { ProductsPage } from "~/ui/components/pages/products/products-page";

export default async function Page() {
  const products = await getAllProducts();
  
  return <ProductsPage initialProducts={products} />;
}
