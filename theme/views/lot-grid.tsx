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
      <>
        <header className="mb-6 flex items-baseline justify-between gap-4 border-b border-neutral-200 pb-4">
          <h2 className="m-0 text-lg font-bold text-neutral-950">
            {title}
          </h2>
          {meta ? (
            <span className="text-xs font-medium text-neutral-500">
              {meta}
            </span>
          ) : null}
        </header>
        <div className="grid grid-cols-4 gap-5 max-[1000px]:grid-cols-3 max-md:grid-cols-2 max-[560px]:grid-cols-1">
          {cards}
        </div>
      </>
    );
  }

  return (
    <section id="featured-lots" className="lots-section lot-list-section">
      <h2 className="section-title lot-list-title">{title}</h2>
      <div className="lot-grid auction-grid lot-list">{cards}</div>
    </section>
  );
}
