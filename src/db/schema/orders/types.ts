import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { orderItemsTable, ordersTable } from "./tables";

export type NewOrder = InferInsertModel<typeof ordersTable>;
export type NewOrderItem = InferInsertModel<typeof orderItemsTable>;

export type Order = Omit<OrderRaw, "totalAmount"> & {
  totalAmount: number;
};

export type OrderItem = Omit<OrderItemRaw, "priceAtPurchase" | "quantity"> & {
  priceAtPurchase: number;
  quantity: number;
};

export type OrderStatus =
  | "cancelled"
  | "delivered"
  | "pending"
  | "processing"
  | "shipped";

export type OrderWithItems = Order & {
  items: OrderItem[];
};

type OrderItemRaw = InferSelectModel<typeof orderItemsTable>;

type OrderRaw = InferSelectModel<typeof ordersTable>;
