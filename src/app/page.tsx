import { getFeaturedProductsHomepage } from "~/data/mocks";
import { getHeroContent } from "~/lib/queries/site-content";
import { HomePage } from "~/ui/components/pages/home/home-page";

export default async function Page() {
  const [featuredProducts, heroContent] = await Promise.all([
    getFeaturedProductsHomepage(),
    getHeroContent(),
  ]);
  
  return <HomePage featuredProducts={featuredProducts} heroContent={heroContent} />;
}
