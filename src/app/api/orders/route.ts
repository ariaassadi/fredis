import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { db } from "~/db";
import { orderItemsTable, ordersTable } from "~/db/schema/orders/tables";

interface CreateOrderRequest {
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  swishConfirmed: boolean;
  totalAmount: number;
}

interface OrderItem {
  priceAtPurchase: number;
  productId: string;
  productName: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequest;

    const {
      customerEmail,
      customerName,
      customerPhone,
      items,
      swishConfirmed,
      totalAmount,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !totalAmount ||
      !items ||
      items.length === 0 ||
      !swishConfirmed
    ) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 },
      );
    }

    const orderId = uuidv4();

    await db.insert(ordersTable).values({
      customerEmail,
      customerName,
      customerPhone,
      id: orderId,
      status: "pending",
      swishConfirmed: swishConfirmed ? "true" : "false",
      totalAmount: totalAmount.toString(),
    });

    const orderItemsValues = items.map((item) => ({
      id: uuidv4(),
      orderId,
      priceAtPurchase: item.priceAtPurchase.toString(),
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity.toString(),
    }));

    await db.insert(orderItemsTable).values(orderItemsValues);

    return NextResponse.json({ orderId, success: true }, { status: 201 });
  } catch (error) {
    console.error("failed to create order:", error);
    return NextResponse.json(
      { error: "failed to create order" },
      { status: 500 },
    );
  }
}
