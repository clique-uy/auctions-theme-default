"use client";

import Link from "next/link";
import SiteNavigation from "./site-navigation";
import { useSiteIdentity } from "@/components/layout/site-identity-provider";

export function SiteHeader() {
  const identity = useSiteIdentity();
  return (
    <header id="site-header" className="site-header header relative z-40 flex min-h-16 items-center justify-between gap-6 border-b border-theme-border bg-theme-surface px-6 text-theme-text max-md:px-4">
      <Link className="site-brand brand min-w-0 text-theme-text" href="/">
        <strong className="site-brand-name block truncate font-theme-display text-xl font-normal">{identity.businessName}@</strong>
      </Link>
      <SiteNavigation />
    </header>
  );
}

export function SiteFooter() {
  const identity = useSiteIdentity();
  return (
    <footer id="site-footer" className="site-footer border-t border-theme-border bg-theme-surface-strong px-6 py-8 text-theme-on-brand max-md:px-4">
      <div className="site-footer-inner footer-inner mx-auto flex max-w-[var(--theme-content-width)] items-center justify-between gap-4">
        <small className="site-footer-copyright text-xs text-color-surface-strong bg-color-surface-strong">© {new Date().getFullYear()} {identity.businessName}</small>
      </div>
    </footer>
  );
}
