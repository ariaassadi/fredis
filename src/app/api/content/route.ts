import { NextResponse } from "next/server";

import { getActiveNotifications, getHeroContent } from "~/lib/queries/site-content";

export async function GET() {
  try {
    const [notifications, heroContent] = await Promise.all([
      getActiveNotifications(),
      getHeroContent(),
    ]);

    return NextResponse.json({
      notifications: notifications ?? [],
      hero: heroContent,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    // return default values instead of error to prevent client-side crashes
    return NextResponse.json({
      notifications: [],
      hero: {
        heroHeading: "Välkommen till",
        heroSubheading: "Vårt Bageri",
        heroDescription: "Upptäck våra halalcertifierade bakverk, bakade med kärlek och omsorg varje dag.",
      },
    });
  }
}

