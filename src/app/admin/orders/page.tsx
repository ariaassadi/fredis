import type { OrderWithItems } from "~/db/schema/orders/types";

import { getAllOrdersWithItems } from "~/lib/queries/orders";
import AdminOrdersPage from "~/ui/components/pages/admin/admin-orders-page";

export default async function Page() {
  let orders: OrderWithItems[] = [];

  try {
    orders = await getAllOrdersWithItems();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }

  return <AdminOrdersPage orders={orders} />;
}
