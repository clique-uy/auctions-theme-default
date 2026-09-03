"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Gavel,
  Lock,
  Search,
  ShieldCheck,
  Tag,
} from "lucide-react";
import type { MarketHeroThemeProps } from "@/components/theme/types";


const badges = [
  { icon: Gavel, label: "Thousands of Auctions" },
  { icon: BadgeCheck, label: "Verified Sellers" },
  { icon: Lock, label: "Secure Payments" },
  { icon: ShieldCheck, label: "Buyer Protection" },
] as const;

export default function Hero({ auction }: MarketHeroThemeProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const description = auction.description?.trim()
    || "From rare collectibles to luxury items, find treasures you won't see anywhere else.";

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim() || category.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  return (
    <section id="featured-auction" className="theme-split-hero" aria-label={auction.title}>
      <div className={`theme-split-hero__media${auction.imageUrl ? "" : " is-empty"}`}>
        {auction.imageUrl ? (
          <img className="theme-split-hero__image" src={auction.imageUrl} alt="" />
        ) : null}
      </div>

      <div className="theme-split-hero__inner">
        <div className="theme-split-hero__copy">
          <h1 className="theme-split-hero__headline">
            <span>Discover. Bid. Win.</span>
            <span className="theme-split-hero__accent">{auction.title}</span>
          </h1>

          <p className="theme-split-hero__description">{description}</p>
          <p className="theme-split-hero__meta">
            {auction.statusLabel}
            {auction.subtitle ? ` · ${auction.subtitle}` : ""}
          </p>

          <form className="theme-split-hero__search" onSubmit={onSearch} role="search">
            <label className="theme-split-hero__query">
              <Search aria-hidden="true" />
              <span className="sr-only">Search</span>
              <input
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for items, categories or keywords"
                autoComplete="off"
              />
            </label>

            <button className="theme-split-hero__search-submit" type="submit">
              Search
            </button>
          </form>

          <div className="theme-split-hero__actions">
            <Link className="theme-split-hero__cta theme-split-hero__cta--primary" href={"/auctions"}>
              Browse Auctions
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="theme-split-hero__cta theme-split-hero__cta--secondary" href="/account/sales">
              <Tag aria-hidden="true" />
              Start Selling
            </Link>
          </div>

          <ul className="theme-split-hero__badges">
            {badges.map((item) => (
              <li key={item.label}>
                <item.icon aria-hidden="true" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
