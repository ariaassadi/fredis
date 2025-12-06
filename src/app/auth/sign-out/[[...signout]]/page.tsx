import type { Metadata } from "next";

import { getCurrentUserOrRedirect } from "~/lib/auth";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/ui/components/page-header";
import { SignOutPage } from "~/ui/components/pages/auth/sign-out-page";
import { Shell } from "~/ui/primitives/shell";

export const metadata: Metadata = {
  description: "Sign out of your account",
  metadataBase: new URL(
    process.env.NEXT_SERVER_APP_URL || "http://localhost:3000"
  ),
  title: "Sign out",
};

export default async function Page() {
  await getCurrentUserOrRedirect();

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Sign out</PageHeaderHeading>
        <PageHeaderDescription>
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <SignOutPage />
    </Shell>
  );
}
