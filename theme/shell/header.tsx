"use client";

import Link from "next/link";
import { Gavel, Search } from "lucide-react";
import OptionalAuthControls from "@/components/auth/optional-auth-controls";
import { useSiteIdentity } from "@/components/layout/site-identity-provider";
import type { SiteHeaderThemeProps } from "@/components/theme/types";

export default function Header({ navigation }: SiteHeaderThemeProps) {
  const identity = useSiteIdentity();

  return (
    <header className="starter-header theme-header">
      <div className="starter-header-inner theme-header-inner">
        <Link className="theme-header-brand" href="/">
          <strong>{identity.businessName}</strong>
        </Link>
        {navigation}
        <div className="theme-header-actions">
          <Link className="theme-header-search" href="/search" aria-label="Search">
            <Search aria-hidden="true" />
          </Link>
          <OptionalAuthControls />
        </div>
      </div>
    </header>
  );
}
