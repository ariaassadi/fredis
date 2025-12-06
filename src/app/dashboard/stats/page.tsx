import { getCurrentUser } from "~/lib/auth";
import { StatsPage } from "~/ui/components/pages/dashboard/stats-page";

export default async function Page() {
  const user = await getCurrentUser();

  return <StatsPage user={user} />;
}
