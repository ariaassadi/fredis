import { NextResponse } from "next/server";

import { getActiveNotifications, getHeroContent } from "~/lib/queries/site-content";

export async function GET() {
  try {
    const [notifications, heroContent] = await Promise.all([
      getActiveNotifications(),
      getHeroContent(),
    ]);

    return NextResponse.json({
      notifications,
      hero: heroContent,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

