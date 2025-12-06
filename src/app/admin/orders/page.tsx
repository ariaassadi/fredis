import { getAllOrdersWithItems } from "~/lib/queries/orders";
import AdminOrdersPage from "~/ui/components/pages/admin/admin-orders-page";

export default async function Page() {
  const orders = await getAllOrdersWithItems();
  return <AdminOrdersPage orders={orders} />;
}

