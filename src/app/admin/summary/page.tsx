import { getUsersWithUploads } from "~/lib/queries/uploads";
import AdminSummaryPage from "~/ui/components/pages/admin/admin-summary-page";

export default async function Page() {
  const data = await getUsersWithUploads();
  return <AdminSummaryPage initialData={data} />;
}
