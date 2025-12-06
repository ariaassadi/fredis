import { Polar } from "@polar-sh/sdk";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import { db } from "~/db";
import { polarCustomerTable, polarSubscriptionTable } from "~/db/schema";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server:
    (process.env.POLAR_ENVIRONMENT as "production" | "sandbox") || "production",
});

/**
 * Create a new customer in Polar and save reference in database
 */
export async function createCustomer(
  userId: string,
  email: string,
  name?: string,
) {
  try {
    const customer = await polarClient.customers.create({
      email,
      externalId: userId,
      name: name || email,
    });

    await db.insert(polarCustomerTable).values({
      createdAt: new Date(),
      customerId: customer.id,
      id: uuidv4(),
      updatedAt: new Date(),
      userId,
    });

    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

/**
 * Get checkout URL for a specific product
 */
export async function getCheckoutUrl(
  customerId: string,
  productSlug: string,
): Promise<null | string> {
  try {
    const checkout = await polarClient.checkouts.create({
      customerId,
      products: [productSlug],
    });
    return checkout.url;
  } catch (error) {
    console.error("Error generating checkout URL:", error);
    return null;
  }
}

/**
 * Get a Polar customer by user ID from the database
 */
export async function getCustomerByUserId(userId: string) {
  const customer = await db.query.polarCustomerTable.findFirst({
    where: eq(polarCustomerTable.userId, userId),
  });

  if (!customer) {
    return null;
  }

  return customer;
}

/**
 * Get customer state from Polar API
 */
export async function getCustomerState(userId: string) {
  const customer = await getCustomerByUserId(userId);

  if (!customer) {
    return null;
  }

  try {
    const customerState = await polarClient.customers.get({
      id: customer.customerId,
    });
    return customerState;
  } catch (error) {
    console.error("Error fetching customer state:", error);
    return null;
  }
}

/**
 * Get all subscriptions for a user
 */
export async function getUserSubscriptions(userId: string) {
  const subscriptions = await db.query.polarSubscriptionTable.findMany({
    where: eq(polarSubscriptionTable.userId, userId),
  });

  return subscriptions;
}

/**
 * Check if a user has an active subscription
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscriptions = await getUserSubscriptions(userId);
  return subscriptions.some((sub) => sub.status === "active");
}

/**
 * Sync subscription data between Polar and our database
 */
export async function syncSubscription(
  userId: string,
  customerId: string,
  subscriptionId: string,
  productId: string,
  status: string,
) {
  try {
    const existingSubscription =
      await db.query.polarSubscriptionTable.findFirst({
        where: eq(polarSubscriptionTable.subscriptionId, subscriptionId),
      });

    if (existingSubscription) {
      await db
        .update(polarSubscriptionTable)
        .set({
          status,
          updatedAt: new Date(),
        })
        .where(eq(polarSubscriptionTable.subscriptionId, subscriptionId));
      return existingSubscription;
    }

    const subscription = await db.insert(polarSubscriptionTable).values({
      createdAt: new Date(),
      customerId,
      id: uuidv4(),
      productId,
      status,
      subscriptionId,
      updatedAt: new Date(),
      userId,
    });

    return subscription;
  } catch (error) {
    console.error("Error syncing subscription:", error);
    throw error;
  }
}
