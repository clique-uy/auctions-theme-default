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
import type { ThemeBlockConfig } from "@/components/theme/types";

type HeroBadge = {
  icon: string;
  label: string;
};

type HeroCategory = {
  label: string;
};

type HeroProps = {
  headline: string;
  headlineAccent: string;
  description: string;
  searchPlaceholder: string;
  categoryAllLabel: string;
  searchButtonLabel: string;
  categories: HeroCategory[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: string;
  imageAlt: string;
  badges: HeroBadge[];
};

const badgeIcons = {
  gavel: Gavel,
  "badge-check": BadgeCheck,
  lock: Lock,
  "shield-check": ShieldCheck,
  tag: Tag,
} as const;

function safeHref(value: string) {
  const href = value.trim();
  if (/^(?:\/|#|https?:\/\/|mailto:|tel:)/i.test(href)) return href;
  return "/";
}

function safeImage(value: string) {
  const src = value.trim();
  return /^(?:\/|https?:\/\/)/i.test(src) ? src : "";
}

function HeroRender({
  headline,
  headlineAccent,
  description,
  searchPlaceholder,
  categoryAllLabel,
  searchButtonLabel,
  categories,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  image,
  imageAlt,
  badges,
}: HeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const imageSrc = safeImage(image);
  const categoryOptions = (categories ?? []).filter((item) => item.label?.trim());
  const trustBadges = (badges ?? []).filter((item) => item.label?.trim());

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim() || category.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  return (
    <section className="theme-split-hero" aria-label={headline || "Hero"}>
      <div
        className={`theme-split-hero__media${imageSrc ? "" : " is-empty"}`}
        aria-hidden={imageSrc ? undefined : true}
      >
        {imageSrc ? (
          <img className="theme-split-hero__image" src={imageSrc} alt={imageAlt || ""} />
        ) : null}
      </div>

      <div className="theme-split-hero__inner">
        <div className="theme-split-hero__copy">
          <h1 className="theme-split-hero__headline">
            {headline ? <span>{headline}</span> : null}
            {headlineAccent ? (
              <span className="theme-split-hero__accent">{headlineAccent}</span>
            ) : null}
          </h1>

          {description ? (
            <p className="theme-split-hero__description">{description}</p>
          ) : null}

          <form className="theme-split-hero__search" onSubmit={onSearch} role="search">
            <label className="theme-split-hero__query">
              <Search aria-hidden="true" />
              <span className="sr-only">{searchButtonLabel || "Buscar"}</span>
              <input
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                autoComplete="off"
              />
            </label>

            {categoryOptions.length > 0 ? (
              <label className="theme-split-hero__category">
                <span className="sr-only">{categoryAllLabel}</span>
                <select
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">{categoryAllLabel}</option>
                  {categoryOptions.map((item) => (
                    <option key={item.label} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </label>
            ) : null}

            <button className="theme-split-hero__search-submit" type="submit">
              {searchButtonLabel || "Search"}
            </button>
          </form>

          <div className="theme-split-hero__actions">
            {primaryCtaLabel ? (
              <Link className="theme-split-hero__cta theme-split-hero__cta--primary" href={safeHref(primaryCtaHref)}>
                {primaryCtaLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            ) : null}
            {secondaryCtaLabel ? (
              <Link className="theme-split-hero__cta theme-split-hero__cta--secondary" href={safeHref(secondaryCtaHref)}>
                <Tag aria-hidden="true" />
                {secondaryCtaLabel}
              </Link>
            ) : null}
          </div>

          {trustBadges.length > 0 ? (
            <ul className="theme-split-hero__badges">
              {trustBadges.map((item) => {
                const Icon = badgeIcons[item.icon as keyof typeof badgeIcons] ?? BadgeCheck;
                return (
                  <li key={item.label}>
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

const Hero = {
  label: "Hero",
  fields: {
    headline: { type: "text", label: "Título", contentEditable: true },
    headlineAccent: { type: "text", label: "Título destacado", contentEditable: true },
    description: { type: "textarea", label: "Bajada", contentEditable: true },
    searchPlaceholder: { type: "text", label: "Placeholder de búsqueda" },
    categoryAllLabel: { type: "text", label: "Etiqueta de todas las categorías" },
    searchButtonLabel: { type: "text", label: "Botón de búsqueda" },
    categories: {
      type: "array",
      label: "Categorías",
      getItemSummary: (item: HeroCategory) => item.label || "Categoría",
      defaultItemProps: { label: "Categoría" },
      arrayFields: {
        label: { type: "text", label: "Nombre" },
      },
    },
    primaryCtaLabel: { type: "text", label: "CTA principal" },
    primaryCtaHref: { type: "text", label: "Enlace del CTA principal" },
    secondaryCtaLabel: { type: "text", label: "CTA secundario" },
    secondaryCtaHref: { type: "text", label: "Enlace del CTA secundario" },
    image: {
      type: "image",
      label: "Imagen",
      hint: "Foto de piezas o colección para el lado derecho.",
    },
    imageAlt: { type: "text", label: "Texto alternativo de la imagen" },
    badges: {
      type: "array",
      label: "Sellos de confianza",
      getItemSummary: (item: HeroBadge) => item.label || "Sello",
      defaultItemProps: { icon: "badge-check", label: "Sello" },
      arrayFields: {
        icon: {
          type: "select",
          label: "Ícono",
          options: [
            { label: "Martillo", value: "gavel" },
            { label: "Verificado", value: "badge-check" },
            { label: "Candado", value: "lock" },
            { label: "Escudo", value: "shield-check" },
            { label: "Etiqueta", value: "tag" },
          ],
        },
        label: { type: "text", label: "Texto" },
      },
    },
  },
  defaultProps: {
    headline: "Discover. Bid. Win.",
    headlineAccent: "Extraordinary Finds.",
    description: "From rare collectibles to luxury items, find treasures you won't see anywhere else.",
    searchPlaceholder: "Search for items, categories or keywords",
    categoryAllLabel: "All Categories",
    searchButtonLabel: "Search",
    categories: [
      { label: "Watches" },
      { label: "Art" },
      { label: "Jewelry" },
      { label: "Collectibles" },
    ],
    primaryCtaLabel: "Browse Auctions",
    primaryCtaHref: "/auctions",
    secondaryCtaLabel: "Start Selling",
    secondaryCtaHref: "/account",
    image: "",
    imageAlt: "Luxury collectibles on a dark marble surface",
    badges: [
      { icon: "gavel", label: "Thousands of Auctions" },
      { icon: "badge-check", label: "Verified Sellers" },
      { icon: "lock", label: "Secure Payments" },
      { icon: "shield-check", label: "Buyer Protection" },
    ],
  },
  render: HeroRender,
} satisfies ThemeBlockConfig;

export default Hero;
