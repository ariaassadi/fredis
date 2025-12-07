import { notFound } from "next/navigation";

import { getOrderWithItems } from "~/lib/queries/orders";
import AdminOrderDetailPage from "~/ui/components/pages/admin/admin-order-detail-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  try {
    const order = await getOrderWithItems(id);

    if (!order) {
      notFound();
    }

    return <AdminOrderDetailPage order={order} />;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    notFound();
  }
}

