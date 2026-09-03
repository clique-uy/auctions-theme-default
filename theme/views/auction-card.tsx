import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AuctionCardThemeProps } from "@/components/theme/types";
import { cn } from "@/lib/utils";

export default function AuctionCard({ auction }: AuctionCardThemeProps) {
  const unavailable = auction.status === "ended" || auction.status === "cancelled";

  return (
    <Link
      className={cn(
        "theme-auction-card",
        unavailable && "is-unavailable",
      )}
      href={auction.detailsHref}
      prefetch
    >
      <div className="theme-auction-card__copy">
        <p className="theme-auction-card__meta">
          {auction.statusLabel}
          {auction.format === "live" ? " · Live" : ""}
        </p>
        <h3 className="theme-auction-card__title">{auction.title}</h3>
        {auction.description ? (
          <p className="theme-auction-card__description">{auction.description}</p>
        ) : null}
        <p className="theme-auction-card__timing">{auction.timingLabel}</p>
        <span className="theme-auction-card__cta">
          View Auction
          <ArrowRight aria-hidden="true" />
        </span>
      </div>

      <div
        className={cn(
          "theme-auction-card__media",
          !auction.imageUrl && "is-empty",
        )}
      >
        {auction.imageUrl ? (
          <img className="theme-auction-card__image" src={auction.imageUrl} alt="" />
        ) : null}
      </div>
    </Link>
  );
}
