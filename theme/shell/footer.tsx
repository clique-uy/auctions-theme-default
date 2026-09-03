"use client";

import Link from "next/link";
import { Gavel } from "lucide-react";
import { useSiteIdentity } from "@/components/layout/site-identity-provider";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/auctions", label: "Auctions" },
  { href: "/categories", label: "Categories" },
  { href: "/search", label: "Search" },
] as const;

const accountLinks = [
  { href: "/account/sales", label: "Sell" },
  { href: "/account", label: "My Account" },
  { href: "/wishlist", label: "Wishlist" },
] as const;

const supportLinks = [
  { href: "/faqs", label: "How It Works" },
  { href: "/contact", label: "Contact" },
  { href: "/terms-and-conditions", label: "Terms" },
] as const;

export default function Footer() {
  const identity = useSiteIdentity();

  return (
    <footer className="starter-footer theme-footer">
      <div className="theme-footer-inner">
        <div className="theme-footer-top">
          <div className="theme-footer-brand">
            <Link className="theme-footer-logo" href="/">
              <strong>{identity.businessName}</strong>
            </Link>
            <p>
              {identity.subtitle?.trim()
                || "Discover. Bid. Win. Extraordinary finds from verified sellers."}
            </p>
          </div>

          <nav className="theme-footer-nav" aria-label="Explore">
            <h2>Explore</h2>
            {exploreLinks.map((link) => (
              <Link href={link.href} key={link.href}>{link.label}</Link>
            ))}
          </nav>

          <nav className="theme-footer-nav" aria-label="Account">
            <h2>Account</h2>
            {accountLinks.map((link) => (
              <Link href={link.href} key={link.href}>{link.label}</Link>
            ))}
          </nav>

          <nav className="theme-footer-nav" aria-label="Support">
            <h2>Support</h2>
            {supportLinks.map((link) => (
              <Link href={link.href} key={link.href}>{link.label}</Link>
            ))}
          </nav>
        </div>

        <div className="theme-footer-bottom">
          <small>© {new Date().getFullYear()} {identity.businessName}. All rights reserved.</small>
          <small>Secure payments · Buyer protection</small>
        </div>
      </div>
    </footer>
  );
}
