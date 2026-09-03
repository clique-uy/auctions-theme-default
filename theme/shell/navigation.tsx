"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useStorefrontAuctions } from "@/components/theme/storefront-data";

const links = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  { href: "/faqs", label: "How It Works", match: (path: string) => path.startsWith("/faqs") },
  { href: "/account/sales", label: "Sell", match: (path: string) => path.startsWith("/account/sales") },
  { href: "/contact", label: "Contact", match: (path: string) => path.startsWith("/contact") },
] as const;

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase("es") + part.slice(1))
    .join(" ");
}

function slugify(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Navigation() {
  const pathname = usePathname() || "/";
  const { auctions, loading } = useStorefrontAuctions({ limit: 100 });
  const categories = useMemo(() => {
    const bySlug = new Map<string, string>();
    for (const auction of auctions) {
      for (const slug of auction.rubroSlugs ?? []) {
        const normalized = slug.trim();
        if (normalized && !bySlug.has(normalized)) {
          bySlug.set(normalized, humanizeSlug(normalized));
        }
      }
      for (const lot of auction.lots ?? []) {
        const name = lot.category?.trim();
        if (!name) continue;
        const slug = slugify(name);
        if (slug) bySlug.set(slug, name);
      }
    }
    return [...bySlug.entries()]
      .map(([slug, name]) => ({ slug, name }))
      .sort((left, right) => left.name.localeCompare(right.name, "es"));
  }, [auctions]);
  const categoriesActive = pathname.startsWith("/categor");

  return (
    <nav className="theme-header-nav" aria-label="Main navigation">
      {links.slice(0, 1).map((link) => (
        <Link
          className={link.match(pathname) ? "is-active" : undefined}
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}

      <div className="theme-header-categories">
        <Link
          aria-haspopup="menu"
          className={categoriesActive ? "is-active" : undefined}
          href="/categories"
        >
          Categories
          <ChevronDown aria-hidden="true" />
        </Link>
        <div className="theme-header-popover" role="menu" aria-label="Categories">
          {loading ? (
            <p className="theme-header-popover-status">Loading categories…</p>
          ) : categories.length === 0 ? (
            <p className="theme-header-popover-status">No categories yet.</p>
          ) : (
            categories.map((category) => (
              <Link
                href={`/category/${encodeURIComponent(category.slug)}`}
                key={category.slug}
                role="menuitem"
              >
                {category.name}
              </Link>
            ))
          )}
          <Link className="theme-header-popover-all" href="/categories" role="menuitem">
            View all categories
          </Link>
        </div>
      </div>

      {links.slice(1).map((link) => (
        <Link
          className={link.match(pathname) ? "is-active" : undefined}
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
