import { requireAdminAuth } from "~/lib/admin-auth";
import { getSiteContent } from "~/lib/queries/site-content";
import AdminContentPage from "~/ui/components/pages/admin/admin-content-page";
import { InitializeContentButton } from "~/ui/components/pages/admin/initialize-content-button";

export default async function ContentPage() {
  try {
    await requireAdminAuth();
  } catch (error) {
    console.error("Admin auth failed:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Åtkomst nekad</h2>
          <p className="text-muted-foreground">
            Du har inte behörighet att komma åt denna sida.
          </p>
        </div>
      </div>
    );
  }
  
  let content = null;
  try {
    content = await getSiteContent();
  } catch (error) {
    console.error("Failed to fetch site content:", error);
  }
  
  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Innehåll hittades inte</h2>
          <p className="text-muted-foreground mb-4">
            Sidinnehåll har inte initierats. Klicka på knappen nedan för att initiera standardinnehål.
          </p>
          <InitializeContentButton />
        </div>
      </div>
    );
  }

  return <AdminContentPage initialContent={content} />;
}

