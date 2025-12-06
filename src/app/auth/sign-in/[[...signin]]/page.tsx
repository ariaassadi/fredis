import { SYSTEM_CONFIG } from "~/app";
import { getCurrentUserOrRedirect } from "~/lib/auth";
import { SignInPage } from "~/ui/components/pages/auth/sign-in-page";

export default async function Page() {
  await getCurrentUserOrRedirect(
    undefined,
    SYSTEM_CONFIG.redirectAfterSignIn,
    true
  );

  return <SignInPage />;
}
