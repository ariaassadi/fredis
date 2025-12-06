import { getAllProducts } from "~/lib/queries/products";
import AdminProductsPage from "~/ui/components/pages/admin/admin-products-page";

export default async function Page() {
  const products = await getAllProducts();
  return <AdminProductsPage products={products} />;
}

