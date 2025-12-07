import { notFound } from "next/navigation";

import { getProductById } from "~/lib/queries/products";
import AdminProductFormPage from "~/ui/components/pages/admin/admin-product-form-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const product = await getProductById(id);

    if (!product) {
      notFound();
    }

    return <AdminProductFormPage product={product} />;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }
}
