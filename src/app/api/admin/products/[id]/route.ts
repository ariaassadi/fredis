import { NextResponse } from "next/server";

import { updateProduct } from "~/lib/queries/products";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      name?: string;
      description?: string;
      category?: string;
      price?: string;
      originalPrice?: string;
      image?: string;
      inStock?: boolean;
      features?: string[];
    };

    const productData = {
      name: body.name,
      description: body.description,
      category: body.category,
      price: body.price,
      originalPrice: body.originalPrice || null,
      image: body.image,
      inStock: body.inStock,
      features: body.features,
    };

    const product = await updateProduct(id, productData);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

