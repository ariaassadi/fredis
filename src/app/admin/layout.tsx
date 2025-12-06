import type React from "react";

import { requireAdminAuth } from "~/lib/admin-auth";
import AdminNav from "~/ui/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  await requireAdminAuth();

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
