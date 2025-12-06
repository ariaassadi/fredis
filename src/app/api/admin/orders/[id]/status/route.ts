import { NextResponse } from "next/server";

import { updateOrderStatus } from "~/lib/queries/orders";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as { status?: string };
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Status is required" },
        { status: 400 }
      );
    }

    const order = await updateOrderStatus(id, status);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

