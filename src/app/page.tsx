import { getFeaturedProductsHomepage } from "~/data/mocks";
import { getHeroContent } from "~/lib/queries/site-content";
import { HomePage } from "~/ui/components/pages/home/home-page";

export const dynamic = "force-dynamic";

const defaultHeroContent = {
  heroHeading: "Välkommen till",
  heroSubheading: "Vårt Bageri",
  heroDescription: "Upptäck våra halalcertifierade bakverk, bakade med kärlek och omsorg varje dag.",
};

export default async function Page() {
  let featuredProducts: Awaited<ReturnType<typeof getFeaturedProductsHomepage>> = [];
  let heroContent = defaultHeroContent;

  try {
    [featuredProducts, heroContent] = await Promise.all([
      getFeaturedProductsHomepage(),
      getHeroContent(),
    ]);
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
  }
  
  return <HomePage featuredProducts={featuredProducts} heroContent={heroContent} />;
}
