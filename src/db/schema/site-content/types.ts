import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { siteContentTable } from "./tables";

export type SiteContent = InferSelectModel<typeof siteContentTable>;
export type NewSiteContent = InferInsertModel<typeof siteContentTable>;

export interface SiteNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isActive: boolean;
  createdAt: string;
}

export const NOTIFICATION_TYPES = ["info", "success", "warning", "error"] as const;

