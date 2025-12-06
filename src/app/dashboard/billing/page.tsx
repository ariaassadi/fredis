import { getCurrentUser } from "~/lib/auth";
import { BillingPage } from "~/ui/components/pages/dashboard/billing-page";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return <BillingPage user={user} />;
}
