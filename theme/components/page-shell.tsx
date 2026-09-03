import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";

export default function PageShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="starter-page">{children}</main>
      <SiteFooter />
    </>
  );
}
