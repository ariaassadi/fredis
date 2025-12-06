import "dotenv/config";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function migrateAll() {
  console.log("Starting full migration process...\n");

  try {
    // Step 1: Migrate images
    console.log("Step 1: Migrating product images to Supabase Storage...\n");
    const { stdout: imageOutput } = await execAsync("pnpm migrate:images");
    console.log(imageOutput);

    // Extract image URLs from output (the script prints a JSON map at the end)
    const imageMapMatch = imageOutput.match(/Image URL mapping:\s*(\{[\s\S]*\})/);
    if (!imageMapMatch) {
      throw new Error("Failed to extract image URLs from migration output");
    }

    const imageMap = JSON.parse(imageMapMatch[1]);
    console.log("\nExtracted image map:", imageMap);

    // Step 2: Migrate products with image URLs
    console.log("\nStep 2: Migrating products to database...\n");
    const imageMapJson = JSON.stringify(imageMap).replace(/"/g, '\\"');
    const { stdout: productOutput } = await execAsync(
      `pnpm migrate:products '${imageMapJson}'`
    );
    console.log(productOutput);

    console.log("\n✓ Full migration completed successfully!");
  } catch (error) {
    console.error("\n✗ Migration failed:", error);
    process.exit(1);
  }
}

migrateAll();

