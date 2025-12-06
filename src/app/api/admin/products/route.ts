import { createId } from "@paralleldrive/cuid2";
import { NextResponse } from "next/server";

import { createProduct } from "~/lib/queries/products";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name: string;
      description: string;
      category: string;
      price: string;
      originalPrice?: string;
      image: string;
      inStock: boolean;
      features: string[];
    };

    const productData = {
      id: createId(),
      name: body.name,
      description: body.description,
      category: body.category,
      price: body.price,
      originalPrice: body.originalPrice || null,
      image: body.image,
      inStock: body.inStock,
      isDisabled: false,
      features: body.features,
    };

    const product = await createProduct(productData);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

