import { desc, eq } from "drizzle-orm";

import { db } from "~/db";
import { orderItemsTable, ordersTable } from "~/db/schema/orders/tables";
import type {
  Order,
  OrderItem,
  OrderWithItems,
  NewOrder,
  NewOrderItem,
} from "~/db/schema/orders/types";

/**
 * Get all orders
 */
export async function getAllOrders(): Promise<Order[]> {
  const orders = await db
    .select()
    .from(ordersTable)
    .orderBy(desc(ordersTable.createdAt));

  return orders.map((order) => ({
    ...order,
    totalAmount: parseFloat(order.totalAmount),
  })) as Order[];
}

/**
 * Get a single order by ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, id))
    .limit(1);

  if (!order) {
    return null;
  }

  return {
    ...order,
    totalAmount: parseFloat(order.totalAmount),
  } as Order;
}

/**
 * Get an order with its items
 */
export async function getOrderWithItems(id: string): Promise<OrderWithItems | null> {
  const order = await getOrderById(id);
  
  if (!order) {
    return null;
  }

  const items = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, id));

  const parsedItems = items.map((item) => ({
    ...item,
    quantity: parseFloat(item.quantity),
    priceAtPurchase: parseFloat(item.priceAtPurchase),
  })) as OrderItem[];

  return {
    ...order,
    items: parsedItems,
  };
}

/**
 * Get all orders with their items
 */
export async function getAllOrdersWithItems(): Promise<OrderWithItems[]> {
  const orders = await getAllOrders();

  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await db
        .select()
        .from(orderItemsTable)
        .where(eq(orderItemsTable.orderId, order.id));

      const parsedItems = items.map((item) => ({
        ...item,
        quantity: parseFloat(item.quantity),
        priceAtPurchase: parseFloat(item.priceAtPurchase),
      })) as OrderItem[];

      return {
        ...order,
        items: parsedItems,
      };
    })
  );

  return ordersWithItems;
}

/**
 * Create a new order with items
 */
export async function createOrder(
  order: NewOrder,
  items: Omit<NewOrderItem, "orderId">[]
): Promise<OrderWithItems> {
  const [newOrder] = await db
    .insert(ordersTable)
    .values(order)
    .returning();

  const orderItems = items.map((item) => ({
    ...item,
    orderId: newOrder.id,
  }));

  const newItems = await db
    .insert(orderItemsTable)
    .values(orderItems)
    .returning();

  return {
    ...newOrder,
    totalAmount: parseFloat(newOrder.totalAmount),
    items: newItems.map((item) => ({
      ...item,
      quantity: parseFloat(item.quantity),
      priceAtPurchase: parseFloat(item.priceAtPurchase),
    })) as OrderItem[],
  };
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  id: string,
  status: string
): Promise<Order | null> {
  const [updatedOrder] = await db
    .update(ordersTable)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(ordersTable.id, id))
    .returning();

  if (!updatedOrder) {
    return null;
  }

  return {
    ...updatedOrder,
    totalAmount: parseFloat(updatedOrder.totalAmount),
  } as Order;
}

/**
 * Update order details
 */
export async function updateOrder(
  id: string,
  order: Partial<NewOrder>
): Promise<Order | null> {
  const [updatedOrder] = await db
    .update(ordersTable)
    .set({
      ...order,
      updatedAt: new Date(),
    })
    .where(eq(ordersTable.id, id))
    .returning();

  if (!updatedOrder) {
    return null;
  }

  return {
    ...updatedOrder,
    totalAmount: parseFloat(updatedOrder.totalAmount),
  } as Order;
}

/**
 * Delete an order (cascades to order items)
 */
export async function deleteOrder(id: string): Promise<void> {
  await db.delete(ordersTable).where(eq(ordersTable.id, id));
}

