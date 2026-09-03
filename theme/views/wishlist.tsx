import Link from "next/link";
import type { WishlistViewThemeProps } from "@/components/theme/types";
import { themeViews } from "@/components/theme/registry";

export default function Wishlist({
  eyebrow,
  title,
  description,
  loading,
  loadError,
  hydrated,
  empty,
  resultsTitle,
  items,
}: WishlistViewThemeProps) {
  const LotGrid = themeViews.LotGrid;
  const ready = !loading && !loadError && hydrated;

  return (
    <div className="wishlist-page">
      <header className="text-center my-12">
        <p className="text-sm text-gray-500">{eyebrow}</p>
        <h1 className="text-4xl font-bold">{title}</h1>
        <span className="text-sm text-gray-500">{description}</span>
      </header>

      <div className="wishlist-content">
        {loading || !hydrated
          ? <div className="market-state" role="status">Cargando favoritos…</div>
          : null}

        {!loading && loadError
          ? <div className="market-state error" role="alert">{loadError}</div>
          : null}

        {ready && items.length === 0
          ? (
            <section className="wishlist-empty" aria-live="polite">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
              </svg>
              <h2>{empty.title}</h2>
              <p>{empty.description}</p>
              <Link href={empty.ctaHref}>{empty.ctaLabel}</Link>
            </section>
          )
          : null}

        {ready && items.length > 0
          ? (
            <LotGrid
              context="wishlist"
              title={resultsTitle}
              meta={`${items.length} ${items.length === 1 ? "lote" : "lotes"}`}
              items={items}
            />
          )
          : null}
      </div>
    </div>
  );
}
