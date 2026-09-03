import type { LotGridThemeProps } from "@/components/theme/types";
import { themeComponents } from "@/components/theme/registry";

export default function LotGrid({
  context,
  title,
  meta,
  items,
}: LotGridThemeProps) {
  const LotCard = themeComponents.LotCard;
  const cards = items.map((item) => (
    <LotCard
      context={context}
      key={`${item.lot.auction.id}:${item.lot.id}`}
      lot={item.lot}
      slots={item.slots}
    />
  ));

  if (context === "auction") {
    return (
      <section id="auction-lots" className="detail-lots-section lot-list-section">
        <header className="detail-lots-heading">
          <h2 className="detail-lots-title">{title}</h2>
          {meta ? <span className="detail-lots-meta">{meta}</span> : null}
        </header>
        <div className="lot-grid auction-grid lot-list">{cards}</div>
      </section>
    );
  }

  if (context === "wishlist") {
    return (
      <section className="theme-lot-grid">
        <header className="theme-lot-grid__heading">
          <h2>{title}</h2>
          {meta ? <span>{meta}</span> : null}
        </header>
        <div className="theme-lot-grid__items">{cards}</div>
      </section>
    );
  }

  return (
    <section id="featured-lots" className="lots-section lot-list-section p-4 pb-12">
      <h2 className="section-title lot-list-title">{title}</h2>
      <div className="lot-grid auction-grid lot-list">{cards}</div>
    </section>
  );
}
