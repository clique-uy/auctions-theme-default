import Link from "next/link";
import type { LiveAuctionThemeProps } from "@/components/theme/types";

export default function LiveAuction({
  auction,
  loadError,
  slots,
}: LiveAuctionThemeProps) {
  return (
    <>
      <section className="live-event-shell">
        <header className="live-event-header">
          <div>
            <span className="live-event-badge"><i /> En vivo</span>
            <div>
              <p>{auction.eyebrow}</p>
              <h1>{auction.title}</h1>
            </div>
          </div>
          <span className={`live-event-connection ${auction.connection}`} role="status">
            <i />
            {auction.connectionLabel}
          </span>
        </header>

        <div className="live-event-stage">
          <div className="live-event-video">
            {auction.hasLivestream
              ? slots.livestream
              : (
                <div className="live-event-video-placeholder">
                  <span aria-hidden="true">▶</span>
                  <strong>{auction.livestreamUnavailableTitle}</strong>
                  <small>{auction.livestreamUnavailableDescription}</small>
                </div>
              )}
          </div>

          <aside className="live-event-active" aria-live="polite">
            <header>
              <span>Lote actual</span>
              {auction.activeLot
                ? (
                  <small>
                    {auction.activeLot.position} de {auction.rail.lots.length}
                  </small>
                )
                : null}
            </header>
            {auction.activeLot
              ? (
                <>
                  <div
                    className="live-event-active-image"
                    style={auction.activeLot.imageUrl
                      ? { backgroundImage: `url(${JSON.stringify(auction.activeLot.imageUrl)})` }
                      : undefined}
                  >
                    <span>{auction.activeLot.positionLabel}</span>
                  </div>
                  <div className="live-event-active-copy">
                    <h2>{auction.activeLot.name}</h2>
                    {auction.activeLot.currentAmountLabel
                      ? (
                        <div className="live-event-price">
                          <small>{auction.activeLot.priceLabel}</small>
                          <strong>{auction.activeLot.currentAmountLabel}</strong>
                          {auction.activeLot.bidCountLabel
                            ? <span>{auction.activeLot.bidCountLabel}</span>
                            : null}
                        </div>
                      )
                      : null}
                    {auction.activeLot.legacySale
                      ? (
                        <p className="sale-method-note">
                          Modalidad heredada: transacciones en línea no disponibles.
                        </p>
                      )
                      : null}
                    {auction.activeLot.youAreWinning
                      ? (
                        <p className="live-event-winning winning">
                          <i /> {auction.activeLot.youAreWinningLabel}
                        </p>
                      )
                      : null}
                    {slots.activeBidControl}
                    <Link className="live-event-lot-link" href={auction.activeLot.detailsHref}>
                      Ver ficha e historial <span>→</span>
                    </Link>
                  </div>
                </>
              )
              : (
                <div className="live-event-waiting">
                  <span className="live-event-waiting-icon" aria-hidden="true">◷</span>
                  <h2>{auction.waiting.title}</h2>
                  <p>{auction.waiting.description}</p>
                  {auction.waiting.nextLotName
                    ? (
                      <div>
                        <small>A continuación</small>
                        <strong>{auction.waiting.nextLotName}</strong>
                      </div>
                    )
                    : null}
                </div>
              )}
          </aside>
        </div>

        <nav className="live-event-rail" aria-label="Lotes de la subasta">
          <div>
            <strong>{auction.rail.title}</strong>
            <span>{auction.rail.progressLabel}</span>
          </div>
          <div className="live-event-rail-list">
            {auction.rail.lots.map((lot) => (
              <Link
                className={lot.status}
                aria-current={lot.current ? "step" : undefined}
                href={lot.detailsHref}
                key={lot.id}
              >
                <span>{lot.positionLabel}</span>
                <strong>{lot.name}</strong>
                <small>{lot.statusLabel}</small>
              </Link>
            ))}
          </div>
        </nav>
      </section>

      <div className="auction-detail-content live-event-content">
        {loadError
          ? <div className="market-state error" role="alert">{loadError}</div>
          : null}
      </div>
    </>
  );
}
