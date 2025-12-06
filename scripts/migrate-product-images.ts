import "dotenv/config";
import { createId } from "@paralleldrive/cuid2";

import { uploadProductImage } from "~/lib/supabase-storage";

// Product images to migrate
const productImages = [
  {
    id: "1",
    name: "Kladdkaka",
    url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    name: "Kärleksmums",
    url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "3",
    name: "Irakisk Baklava",
    url: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "4",
    name: "Kanelbullar",
    url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "5",
    name: "Semla",
    url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "6",
    name: "Prinsesstårta",
    url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

async function migrateImages() {
  console.log("Starting image migration...\n");

  const imageMap: Record<string, string> = {};

  for (const product of productImages) {
    try {
      console.log(`Downloading image for ${product.name}...`);
      
      // Download image
      const response = await fetch(product.url);
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Generate filename (sanitize for Supabase Storage - no special characters)
      const sanitizedName = product.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-z0-9-]/g, "-") // Replace non-alphanumeric with dash
        .replace(/-+/g, "-") // Replace multiple dashes with single dash
        .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
      const fileName = `${product.id}-${sanitizedName}.jpg`;

      console.log(`Uploading ${fileName} to Supabase Storage...`);
      
      // Upload to Supabase Storage
      const publicUrl = await uploadProductImage(buffer, fileName);
      
      imageMap[product.id] = publicUrl;
      
      console.log(`✓ ${product.name}: ${publicUrl}\n`);
    } catch (error) {
      console.error(`✗ Failed to migrate image for ${product.name}:`, error);
      throw error;
    }
  }

  console.log("Image migration complete!\n");
  console.log("Image URL mapping:");
  console.log(JSON.stringify(imageMap, null, 2));

  return imageMap;
}

migrateImages()
  .then(() => {
    console.log("\n✓ All images migrated successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n✗ Migration failed:", error);
    process.exit(1);
  });

