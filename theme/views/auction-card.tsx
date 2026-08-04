import Link from "next/link";
import type { AuctionCardThemeProps } from "@/components/theme/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const fallbackBackgrounds = [
  "bg-[url('/images/antique-coins.png')] bg-[center_61%]",
  "bg-[url('/images/silver-birds.png')] bg-[center_48%]",
  "bg-[url('/images/antique-coins.png')] bg-[center_42%] [filter:sepia(0.25)_saturate(0.75)]",
] as const;

export default function AuctionCard({ auction }: AuctionCardThemeProps) {
  const fallbackClass = fallbackBackgrounds[auction.fallbackIndex % 3];

  return (
    <Link
      className={cn(
        "group relative block min-h-[19rem] overflow-hidden rounded-[var(--theme-card-radius)] bg-theme-surface-strong text-theme-on-brand shadow-theme-card",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[var(--theme-image-overlay)] after:content-['']",
        "transition-[transform,box-shadow] duration-[var(--theme-motion-base)] ease-theme hover:-translate-y-0.5 hover:shadow-theme-card-hover focus-visible:outline-offset-[-3px]",
        "max-lg:min-h-[17rem] max-md:min-h-[15rem] max-md:rounded-[var(--theme-card-radius)] p-4",
      )}
      href={auction.detailsHref}
      prefetch
    >
      {auction.imageUrl ? (
        <Image
          className="absolute inset-0 size-full object-cover object-center transition-transform duration-[var(--theme-motion-base)] ease-theme group-hover:scale-[1.015]"
          unoptimized={true}
          fill={true}
          sizes="100vw"
          priority={true}
          loading="eager"
          src={auction.imageUrl}
          alt=""
        />
      ) : (
        <div
          className={cn("absolute inset-0 bg-cover", fallbackClass)}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "absolute top-3/4 left-[clamp(1rem,6vw,2rem)] z-[1] max-w-xl -translate-y-1/2 pr-6",
          "max-md:left-7",
        )}
      >
        <h3 className="m-0 mb-3 font-theme-display text-3xl leading-tight font-normal text-theme-on-brand max-md:text-2xl">
          {auction.title}
        </h3>
        <p className="m-0 text-xs font-medium tracking-wide text-theme-on-brand/80">
          <span>{auction.statusLabel}</span>
          <span aria-hidden="true"> · </span>
          <span>{auction.timingLabel}</span>
        </p>
      </div>
    </Link>
  );
}
