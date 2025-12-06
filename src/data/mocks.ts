import { getFeaturedProducts } from "~/lib/queries/products";

// Fetch featured products from Supabase
export async function getFeaturedProductsHomepage() {
  try {
    const products = await getFeaturedProducts(4);
    return products.map((product) => ({
      category: product.category,
      id: product.id,
      image: product.image,
      inStock: product.inStock,
      name: product.name,
      originalPrice: typeof product.originalPrice === "string" ? parseFloat(product.originalPrice) : product.originalPrice,
      price: typeof product.price === "string" ? parseFloat(product.price) : product.price,
    }));
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return [];
  }
}

// Categories - can be made dynamic from products later
export const categories = [
  {
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    name: "Kakor",
    productCount: 12,
  },
  {
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4bdc5d3a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    name: "Baklava",
    productCount: 8,
  },
  {
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    name: "Bakverk",
    productCount: 15,
  },
  {
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    name: "Drycker",
    productCount: 10,
  },
];


// Testimonials for the testimonials section
export const testimonials = [
  {
    author: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      handle: "@sarahe",
      name: "Sarah Andersson",
    },
    text: "Ärligt talat, jag minns inte ens hur många gånger jag har beställt härifrån. Aldrig haft en dålig upplevelse. Allt bara fungerar, och när jag hade en fråga var supporten där på typ fem minuter.",
  },
  {
    author: {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      handle: "@mikael",
      name: "Mikael Johansson",
    },
    text: "Förväntade mig inte mycket, men blev superimponerad. Fick en kladdkaka som smakar fantastiskt och kom snabbare än från andra kaféer. Inga klagomål.",
  },
  {
    author: {
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      handle: "@emma",
      name: "Emma Lindqvist",
    },
    text: "Jag var helt vilse när jag skulle välja baklava. Skickade ett meddelande och fick ett omtänksamt svar inom en timme. De pushade inte det dyraste alternativet heller, vilket jag respekterar. Älskar vad jag fick.",
  },
  {
    author: {
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      handle: "@david",
      name: "David Persson",
    },
    text: "Sidan är ren, kassan var snabb, och min beställning kom två dagar tidigare. Vilket aldrig händer. Tittar redan på min nästa beställning 👀",
  },
  {
    author: {
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      handle: "@sofia",
      name: "Sofia Nilsson",
    },
    text: "Äntligen. Ett kafé som inte får mig att känna mig dum. Allt förklaras på enkelt svenska, och deras chatteam behandlade mig inte som om jag störde dem. 10/10.",
  },
];
