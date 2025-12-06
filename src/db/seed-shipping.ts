import "dotenv/config";
import { createId } from "@paralleldrive/cuid2";

import { db } from "~/db";
import { shippingProvidersTable } from "~/db/schema";

async function seedShippingProviders() {
  console.log("seeding shipping providers...");

  const providers = [
    {
      id: createId(),
      name: "Central Warehouse",
      standardPrice: 14900, // 149 kr in öre
    },
    {
      id: createId(),
      name: "Volt",
      standardPrice: 14900, // base price, will be discounted by juicy
    },
    {
      id: createId(),
      name: "Pickup",
      standardPrice: 9900, // 99 kr in öre
    },
  ];

  for (const provider of providers) {
    try {
      await db
        .insert(shippingProvidersTable)
        .values({
          createdAt: new Date(),
          id: provider.id,
          name: provider.name,
          standardPrice: provider.standardPrice,
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
      console.log(`√ seeded provider: ${provider.name}`);
    } catch (error) {
      console.error(`error seeding provider ${provider.name}:`, error);
    }
  }

  console.log("✓ shipping providers seeded");
}

seedShippingProviders()
  .then(() => {
    console.log("done");
    process.exit(0);
  })
  .catch((error) => {
    console.error("error:", error);
    process.exit(1);
  });
