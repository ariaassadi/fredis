import { SYSTEM_CONFIG } from "~/app";
import { getCurrentUserOrRedirect } from "~/lib/auth";
import { SignUpPage } from "~/ui/components/pages/auth/sign-up-page";

export default async function Page() {
  await getCurrentUserOrRedirect(
    undefined,
    SYSTEM_CONFIG.redirectAfterSignIn,
    true
  );

  return <SignUpPage />;
}
