import { getProductById } from "~/lib/queries/products";
import { ProductDetailPage } from "~/ui/components/pages/products/product-detail-page";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  
  try {
    const product = await getProductById(id);
    
    if (!product) {
      notFound();
    }
    
    return <ProductDetailPage product={product} />;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }
}
