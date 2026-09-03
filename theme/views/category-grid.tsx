import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CategoryGridThemeProps } from "@/components/theme/types";
import { cn } from "@/lib/utils";

export default function CategoryGrid({
  loading,
  loadError,
  columns,
  categories,
}: CategoryGridThemeProps) {
  if (loading) {
    return (
      <section className="theme-category-grid" aria-busy="true" aria-label="Cargando rubros">
        <div className={`theme-category-grid__items pb-grid-cols-${columns}`}>
          {Array.from({ length: columns }, (_, index) => (
            <div className="theme-category-card is-skeleton" key={index} aria-hidden="true" />
          ))}
        </div>
        <span className="sr-only">Cargando rubros…</span>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className="theme-category-grid" role="alert">
        <p className="theme-category-grid__status">{loadError}</p>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="theme-category-grid">
        <p className="theme-category-grid__status">No hay rubros disponibles por el momento.</p>
      </section>
    );
  }

  return (
    <section className="theme-category-grid" aria-label="Rubros">
      <div className={`theme-category-grid__items pb-grid-cols-${columns}`}>
        {categories.map((category) => (
          <Link
            className="theme-category-card"
            href={category.detailsHref}
            key={category.slug}
            prefetch
          >
            <div
              className={cn(
                "theme-category-card__media",
                !category.imageUrl && "is-empty",
              )}
            >
              {category.imageUrl ? (
                <img className="theme-category-card__image" src={category.imageUrl} alt="" />
              ) : null}
            </div>
            <div className="theme-category-card__copy">
              <p className="theme-category-card__meta">{category.auctionCountLabel}</p>
              <h3 className="theme-category-card__title">{category.name}</h3>
              {category.description ? (
                <p className="theme-category-card__description">{category.description}</p>
              ) : null}
              <span className="theme-category-card__cta">
                Browse
                <ArrowRight aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
