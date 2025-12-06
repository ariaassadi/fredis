import type { InferSelectModel } from "drizzle-orm";

import type { shippingProvidersTable } from "./tables";

export type ShippingProvider = InferSelectModel<typeof shippingProvidersTable>;
