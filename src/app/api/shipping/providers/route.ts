import { NextResponse } from "next/server";

import { db } from "~/db";
import { shippingProvidersTable } from "~/db/schema";

export async function GET() {
  try {
    const providers = await db
      .select()
      .from(shippingProvidersTable)
      .orderBy(shippingProvidersTable.name);

    return NextResponse.json(providers);
  } catch (error) {
    console.error("error fetching shipping providers:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
