import Link from "next/link";
import type { MarketHeroThemeProps } from "@/components/theme/types";
import { cn } from "@/lib/utils";

export default function Hero({ auction }: MarketHeroThemeProps) {
  return (
    <Link
      id="featured-auction"
      aria-label={`Ver subasta ${auction.title}`}
      className={cn(
        "group relative block h-[clamp(24rem,42vw,36rem)] overflow-hidden bg-theme-surface-strong text-theme-on-brand",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[var(--theme-image-overlay)] after:content-['']",
        "focus-visible:outline-offset-[-3px] max-md:h-[23rem]",
      )}
      href={auction.detailsHref}
    >
      {auction.imageUrl ? (
        <img
          className="absolute inset-0 size-full object-cover object-[center_44%] transition-transform duration-[var(--theme-motion-base)] ease-theme group-hover:scale-[1.015]"
          src={auction.imageUrl}
          alt=""
        />
      ) : (
        <div
          className="absolute inset-0 bg-theme-surface-strong"
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "absolute bottom-[clamp(3.5rem,8vw,6.5rem)] left-[max(1.5rem,calc((100vw-var(--theme-content-width))/2+1.5rem))] z-[1] max-w-2xl pr-6",
          "max-md:left-6 px-4",
        )}
      >
        <h1 className=" m-0 mb-3 font-theme-display text-4xl leading-tight font-normal text-white max-md:text-3xl">
          {auction.title}
        </h1>
        <p className="m-0 max-w-xl text-sm leading-relaxed text-theme-on-brand/85">
          {auction.subtitle}
        </p>
      </div>
    </Link>
  );
}
