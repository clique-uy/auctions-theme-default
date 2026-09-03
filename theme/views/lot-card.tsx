import Link from "next/link";
import { Clock } from "lucide-react";
import type { LotCardThemeProps } from "@/components/theme/types";
import { cn } from "@/lib/utils";

const fallbackPositions = {
  one: "bg-[position:45%_center] object-[45%_center]",
  two: "bg-[position:75%_center] object-[75%_center]",
} as const;

export default function LotCard({
  lot,
  slots,
}: LotCardThemeProps) {
  const fallbackPosition = fallbackPositions[lot.fallbackVariant];
  const bidCountLabel = lot.bid
    ? `${lot.bid.bidCount} ${lot.bid.bidCount === 1 ? "bid" : "bids"}`
    : null;

  return (
    <article className="theme-lot-card relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_28px_rgba(16,16,16,0.06)]">
      <Link
        aria-label={`Ver ${lot.name}`}
        className="absolute inset-0 z-[1] rounded-[inherit] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#c5953f]"
        href={lot.detailsHref}
        prefetch
      >
        <span className="sr-only">Ver detalle de {lot.name}</span>
      </Link>

      <div className="relative overflow-hidden bg-neutral-100">
        <div
          className={cn(
            "absolute top-3 right-3 z-[3]",
            "[&>button]:relative [&>button]:inset-auto [&>button]:grid [&>button]:size-9 [&>button]:cursor-pointer [&>button]:place-items-center [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-white [&>button]:p-0 [&>button]:text-neutral-500 [&>button]:shadow-md [&>button]:transition-[color,transform] [&>button]:duration-150",
            "[&>button:hover]:scale-105 [&>button:hover]:text-[#c5953f]",
            "[&>button:focus-visible]:outline [&>button:focus-visible]:outline-[3px] [&>button:focus-visible]:outline-offset-2 [&>button:focus-visible]:outline-[#c5953f]",
            "[&>button.active]:text-[#c5953f]",
            "[&>button_svg]:size-[18px] [&>button_svg]:fill-transparent [&>button_svg]:stroke-current [&>button_svg]:[stroke-width:1.8] [&>button_svg]:[stroke-linecap:round] [&>button_svg]:[stroke-linejoin:round]",
            "[&>button.active_svg]:fill-current",
          )}
        >
          {slots.wishlistControl}
        </div>
        {lot.imageUrl ? (
          <img
            className={cn("aspect-[4/3] w-full object-cover", fallbackPosition)}
            src={lot.imageUrl}
            alt=""
          />
        ) : (
          <div
            className={cn(
              "aspect-[4/3] w-full bg-[url('/images/antique-coins.png')] bg-cover bg-center",
              fallbackPosition,
            )}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="pointer-events-none relative z-[2] flex flex-1 flex-col px-4 pt-4 pb-4">
        <h3 className="m-0 line-clamp-2 text-[17px] leading-snug font-bold text-neutral-900">
          {lot.name}
        </h3>
        <p className="mt-1 mb-0 truncate text-sm text-neutral-500">
          {lot.auction.title}
        </p>

        {lot.auction.format === "live" && (
          <small className="mt-1 text-xs text-neutral-500">
            {lot.status === "open"
              ? "Lote activo ahora"
              : lot.status === "closed"
                ? "Lote cerrado"
                : "Pendiente"}
          </small>
        )}

        {lot.legacySale && (
          <small className="mt-2 text-xs text-amber-800">
            Modalidad heredada: transacciones en línea no disponibles
          </small>
        )}

        {lot.bid?.youAreWinning && (
          <p className="mt-2 mb-0 text-sm font-semibold text-emerald-700">
            Vas ganando este lote.
          </p>
        )}
        {lot.bid?.youWon && (
          <p className="mt-2 mb-0 text-sm font-semibold text-emerald-700">
            Oferta más alta — pendiente de adjudicación.
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0 text-[22px] leading-none font-bold text-[#c5953f]">
            {lot.bid?.currentAmountLabel ?? "—"}
          </div>
          <div className="flex min-w-0 flex-col items-end gap-1.5">
            {bidCountLabel ? (
              <span className="text-xs text-neutral-400">{bidCountLabel}</span>
            ) : null}
            <div className="theme-lot-card__countdown flex items-center gap-1 text-[13px] font-medium text-[#d64545]">
              <Clock aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={2.2} />
              {slots.countdown}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
