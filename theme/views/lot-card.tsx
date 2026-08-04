import Link from "next/link";
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

  return (
    <article className="group relative flex min-w-0 flex-col rounded-[var(--theme-card-radius)] bg-theme-surface p-3 shadow-theme-card transition-[transform,box-shadow,border-color] duration-[var(--theme-motion-base)] ease-theme hover:-translate-y-0.5 hover:border-theme-border-strong hover:shadow-theme-card-hover">
      <Link
        aria-label={`Ver ${lot.name}`}
        className="absolute inset-0 z-[1] rounded-[inherit] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-theme-brand"
        href={lot.detailsHref}
        prefetch
      >
        <span className="sr-only">Ver detalle de {lot.name}</span>
      </Link>

      <div className="relative overflow-hidden rounded-[calc(var(--theme-radius-card)-0.25rem)] bg-theme-surface-subtle">
        <div
          className={cn(
            "absolute top-2.5 right-2.5 z-[3]",
            "[&>button]:grid [&>button]:size-9 [&>button]:cursor-pointer [&>button]:place-items-center [&>button]:rounded-full [&>button]:border [&>button]:border-theme-border [&>button]:bg-theme-surface [&>button]:p-0 [&>button]:text-theme-text-muted [&>button]:shadow-theme-card [&>button]:transition-[color,transform] [&>button]:duration-[var(--theme-motion-fast)]",
            "[&>button:hover]:scale-105 [&>button:hover]:text-theme-brand",
            "[&>button:focus-visible]:outline [&>button:focus-visible]:outline-[3px] [&>button:focus-visible]:outline-offset-2 [&>button:focus-visible]:outline-theme-brand",
            "[&>button.active]:text-theme-brand",
            "[&>button_svg]:size-[18px] [&>button_svg]:fill-transparent [&>button_svg]:stroke-current [&>button_svg]:[stroke-width:1.8] [&>button_svg]:[stroke-linecap:round] [&>button_svg]:[stroke-linejoin:round]",
            "[&>button.active_svg]:fill-current",
          )}
        >
          {slots.wishlistControl}
        </div>
        {lot.imageUrl ? (
          <img
            className={cn("aspect-[4/3] w-full object-cover transition-transform duration-[var(--theme-motion-base)] ease-theme group-hover:scale-[1.025]", fallbackPosition)}
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

      <div className="relative z-[2] mt-3 flex flex-1 flex-col gap-1.5">
        <div className="text-sm font-semibold text-theme-brand">
          {slots.countdown}
        </div>

        <h3 className="m-0 font-theme-display text-lg leading-snug font-normal text-theme-text">
          {lot.name}
        </h3>

        {lot.auction.format === "live" && (
          <small className="text-xs text-theme-text-muted">
            {lot.status === "open"
              ? "Lote activo ahora"
              : lot.status === "closed"
                ? "Lote cerrado"
                : "Pendiente"}
          </small>
        )}

        <p className="m-0 truncate text-sm text-theme-text-muted">
          {lot.auction.title}
        </p>

        {lot.bid && (
          <div className="mt-0.5 text-xl font-bold text-theme-text">
            {lot.bid.currentAmountLabel}
          </div>
        )}

        {lot.bid && (
          <small className="text-xs text-theme-text-muted">
            {lot.bid.bidCount} {lot.bid.bidCount === 1 ? "oferta" : "ofertas"}
            {" · "}Próxima {lot.bid.minimumBidLabel}
          </small>
        )}

        {lot.legacySale && (
          <small className="text-xs text-theme-warning">
            Modalidad heredada: transacciones en línea no disponibles
          </small>
        )}

        {lot.bid?.youAreWinning && (
          <p className="m-0 text-sm font-semibold text-theme-success">Vas ganando este lote.</p>
        )}
        {lot.bid?.youWon && (
          <p className="m-0 text-sm font-semibold text-theme-success">
            Terminaste con la oferta más alta. El resultado es provisional
            hasta la adjudicación del rematador.
          </p>
        )}

        <div className="relative z-[2] mt-auto pt-2">{slots.bidControl}</div>
      </div>
    </article>
  );
}
