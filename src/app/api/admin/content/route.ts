import { NextResponse } from "next/server";

import { requireAdminAuth } from "~/lib/admin-auth";
import { getSiteContent, updateSiteContent } from "~/lib/queries/site-content";

export async function GET() {
  try {
    await requireAdminAuth();

    const content = await getSiteContent();

    if (!content) {
      return NextResponse.json(
        { error: "Site content not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching site content:", error);
    return NextResponse.json(
      { error: "Failed to fetch site content" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminAuth();

    const body = (await request.json()) as Record<string, unknown>;

    const updated = await updateSiteContent(body, "admin");

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating site content:", error);
    return NextResponse.json(
      { error: "Failed to update site content" },
      { status: 500 },
    );
  }
}
