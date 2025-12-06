import { requireAdminAuth } from "~/lib/admin-auth";
import { getSiteContent } from "~/lib/queries/site-content";
import AdminContentPage from "~/ui/components/pages/admin/admin-content-page";

export default async function ContentPage() {
  await requireAdminAuth();
  
  const content = await getSiteContent();
  
  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Innehåll hittades inte</h2>
          <p className="text-muted-foreground">
            Sidinnehåll har inte initierats. Kör seed-skriptet.
          </p>
        </div>
      </div>
    );
  }

  return <AdminContentPage initialContent={content} />;
}

