import { redirect } from "next/navigation";

import { isAdminAuthenticated } from "~/lib/admin-auth";
import AdminLoginPage from "~/ui/components/pages/admin/admin-login-page";

export default async function Page() {
  const isAuthenticated = await isAdminAuthenticated();
  
  if (isAuthenticated) {
    redirect("/admin/products");
  }
  
  return <AdminLoginPage />;
}

