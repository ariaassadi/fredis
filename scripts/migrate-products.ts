import "dotenv/config";
import { createId } from "@paralleldrive/cuid2";

import { db } from "~/db";
import { productsTable } from "~/db/schema/products/tables";

// Product data from mock files
const products = [
  {
    category: "Kakor",
    description:
      "Upplev vår klassiska kladdkaka med rik chokladsmak och mjuk, kladdig kärna. Perfekt balans mellan sött och chokladigt, bakad dagligen med de finaste ingredienserna.",
    features: [
      "Bakad dagligen på plats",
      "Rik chokladsmak",
      "Mjuk och kladdig kärna",
      "Perfekt storlek för en person",
      "Serveras med vispgrädde",
      "Glutenfri variant tillgänglig",
    ],
    id: "1",
    image: "", // Will be replaced with Supabase URL
    inStock: true,
    name: "Kladdkaka",
    originalPrice: 45,
    price: 38,
    rating: 4.8,
    specs: {
      allergener: "Gluten, ägg, mjölk",
      bakad: "Dagligen",
      ingredienser: "Choklad, smör, socker, ägg, mjöl",
      portioner: "1 person",
      typ: "Klassisk svensk kaka",
      vikt: "150g",
    },
  },
  {
    category: "Kakor",
    description:
      "Våra kärleksmums är en svensk klassiker med chokladglasyr och kokos. Mjuka, söta och perfekt balanserade med en härlig chokladsmak som smälter i munnen.",
    features: [
      "Traditionell svensk receptur",
      "Chokladglasyr och kokos",
      "Mjuk och fuktig konsistens",
      "Perfekt till kaffe eller te",
      "Bakad dagligen",
      "Vegetarisk",
    ],
    id: "2",
    image: "", // Will be replaced with Supabase URL
    inStock: true,
    name: "Kärleksmums",
    originalPrice: 42,
    price: 35,
    rating: 4.9,
    specs: {
      allergener: "Gluten, ägg, mjölk",
      bakad: "Dagligen",
      ingredienser: "Choklad, kokos, smör, socker",
      portioner: "1 person",
      typ: "Svensk klassiker",
      vikt: "120g",
    },
  },
  {
    category: "Baklava",
    description:
      "Autentisk irakisk baklava med flera lager av fyllig filodeg, fylld med nötter och sötad med honungssirap. En smakexplosion av österländska smaker som tar dig direkt till Bagdad.",
    features: [
      "Autentiskt irakiskt recept",
      "Flera lager filodeg",
      "Fylld med valnötter och pistage",
      "Honungssirap",
      "Hantverksmässigt tillverkad",
      "Perfekt balans mellan sött och nötigt",
    ],
    id: "3",
    image: "", // Will be replaced with Supabase URL
    inStock: true,
    name: "Irakisk Baklava",
    originalPrice: 65,
    price: 55,
    rating: 4.9,
    specs: {
      allergener: "Gluten, nötter",
      bakad: "Dagligen",
      ingredienser: "Filodeg, valnötter, pistage, honung",
      portioner: "4 bitar",
      typ: "Irakisk baklava",
      vikt: "200g",
    },
  },
  {
    category: "Bakverk",
    description:
      "Färska kanelbullar bakade på plats med kardemumma, kanel och pärlsocker. Mjuka, fluffiga och doftande precis som mormor brukade baka dem.",
    features: [
      "Bakade dagligen på plats",
      "Kardemumma och kanel",
      "Mjuk och fluffig konsistens",
      "Pärlsocker på toppen",
      "Perfekt till fika",
      "Vegetarisk",
    ],
    id: "4",
    image: "", // Will be replaced with Supabase URL
    inStock: true,
    name: "Kanelbullar",
    originalPrice: 32,
    price: 28,
    rating: 4.7,
    specs: {
      allergener: "Gluten, mjölk",
      bakad: "Dagligen",
      ingredienser: "Mjöl, kanel, kardemumma, smör",
      portioner: "1 bulle",
      typ: "Svensk fikaklassiker",
      vikt: "80g",
    },
  },
  {
    category: "Bakverk",
    description:
      "Klassisk semla med mandelmassa, vispgrädde och pulver. En svensk fastelagsfavorit som serveras året runt. Perfekt balans mellan sött bröd och rik fyllning.",
    features: [
      "Traditionell svensk semla",
      "Mandelmassa och vispgrädde",
      "Färskt bröd",
      "Pulver på toppen",
      "Serveras med kaffe",
      "Bakad dagligen",
    ],
    id: "5",
    image: "", // Will be replaced with Supabase URL
    inStock: true,
    name: "Semla",
    originalPrice: 48,
    price: 42,
    rating: 4.8,
    specs: {
      allergener: "Gluten, ägg, mjölk, mandel",
      bakad: "Dagligen",
      ingredienser: "Bröd, mandelmassa, vispgrädde, pulver",
      portioner: "1 semla",
      typ: "Svensk fastelagsbakelse",
      vikt: "200g",
    },
  },
  {
    category: "Kakor",
    description:
      "Vår prinsesstårta är en mästerverk med lager av grön marsipan, vaniljkräm och ljusa lager. En svensk klassiker som är lika vacker som den är god.",
    features: [
      "Grön marsipan",
      "Vaniljkräm",
      "Ljusa lager",
      "Hantverksmässigt dekorerad",
      "Perfekt för fester",
      "Bakad dagligen",
    ],
    id: "6",
    image: "", // Will be replaced with Supabase URL
    inStock: true,
    name: "Prinsesstårta",
    originalPrice: 85,
    price: 75,
    rating: 4.9,
    specs: {
      allergener: "Gluten, ägg, mjölk, mandel",
      bakad: "Dagligen",
      ingredienser: "Marsipan, vaniljkräm, grädde, socker",
      portioner: "8-10 bitar",
      typ: "Svensk tårtklassiker",
      vikt: "800g",
    },
  },
];

// Image URL mapping - will be populated by migrate-product-images.ts
// or passed as command line argument
let imageMap: Record<string, string> = {
  "1": "https://ttspgpgvbjumsuzlwfqr.supabase.co/storage/v1/object/public/products/1-kladdkaka.jpg",
  "2": "https://ttspgpgvbjumsuzlwfqr.supabase.co/storage/v1/object/public/products/2-karleksmums.jpg",
  "3": "https://ttspgpgvbjumsuzlwfqr.supabase.co/storage/v1/object/public/products/3-irakisk-baklava.jpg",
  "4": "https://ttspgpgvbjumsuzlwfqr.supabase.co/storage/v1/object/public/products/4-kanelbullar.jpg",
  "5": "https://ttspgpgvbjumsuzlwfqr.supabase.co/storage/v1/object/public/products/5-semla.jpg",
  "6": "https://ttspgpgvbjumsuzlwfqr.supabase.co/storage/v1/object/public/products/6-prinsesstarta.jpg",
};

async function migrateProducts() {
  console.log("Starting product migration...\n");

  // Check if image URLs are provided
  const missingImages = Object.entries(imageMap).filter(([_, url]) => !url);
  if (missingImages.length > 0) {
    console.error("Error: Image URLs are missing. Please run migrate-product-images.ts first.");
    console.error("Missing images for product IDs:", missingImages.map(([id]) => id).join(", "));
    process.exit(1);
  }

  try {
    for (const product of products) {
      const imageUrl = imageMap[product.id];
      if (!imageUrl) {
        throw new Error(`No image URL found for product ${product.id} (${product.name})`);
      }

      console.log(`Migrating ${product.name}...`);

      await db.insert(productsTable).values({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString(),
        image: imageUrl,
        inStock: product.inStock,
        isDisabled: false,
        features: product.features,
      });

      console.log(`✓ ${product.name} migrated\n`);
    }

    console.log("✓ All products migrated successfully");
  } catch (error) {
    console.error("✗ Migration failed:", error);
    throw error;
  }
}

// Allow passing image map as command line argument or read from file
const imageMapArg = process.argv[2];
if (imageMapArg) {
  try {
    const parsed = JSON.parse(imageMapArg) as Record<string, string>;
    imageMap = { ...imageMap, ...parsed };
    console.log("Using provided image map:", imageMap);
  } catch (error) {
    console.error("Failed to parse image map:", error);
    console.log("Usage: pnpm migrate:products '{\"1\":\"url1\",\"2\":\"url2\",...}'");
    process.exit(1);
  }
}

migrateProducts()
  .then(() => {
    console.log("\n✓ Migration complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n✗ Migration failed:", error);
    process.exit(1);
  });

