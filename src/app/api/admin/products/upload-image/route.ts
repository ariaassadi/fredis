import { NextResponse } from "next/server";
import { requireAdminAuth } from "~/lib/admin-auth";
import { uploadProductImage } from "~/lib/supabase-storage";

export async function POST(request: Request) {
  try {
    await requireAdminAuth();

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Ingen fil uppladdad" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Endast bildfiler är tillåtna" }, { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Filen är för stor (max 5MB)" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;

    // Upload to Supabase
    const imageUrl = await uploadProductImage(buffer, fileName);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Misslyckades med att ladda upp bilden" },
      { status: 500 }
    );
  }
}

