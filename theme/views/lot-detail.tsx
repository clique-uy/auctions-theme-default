import Link from "next/link";
import type { LotDetailThemeProps } from "@/components/theme/types";

export default function LotDetail({
  loading,
  loadError,
  lot,
  slots,
}: LotDetailThemeProps) {
  if (loading) {
    return <div id="lot-detail-status" className="market-state lot-detail-status" role="status">Cargando lote…</div>;
  }

  if (loadError || !lot) {
    return (
      <div id="lot-detail" className="lot-detail-shell">
        <div className="market-state error" role="alert">
          {loadError || "No pudimos cargar este lote. Puede que ya no esté disponible."}
        </div>
      </div>
    );
  }

  return (
    <div id="lot-detail" className="lot-detail-shell">
      <nav className="lot-detail-breadcrumb" aria-label="Navegación">
        <Link className="lot-detail-back-link" href={lot.auction.backHref}>{lot.auction.backLabel}</Link>
      </nav>

      {lot.hasLivestream ? (
        <aside className="lot-live-player livestream-slot" aria-label="Transmisión de la subasta">
          {slots.livestream}
        </aside>
      ) : null}

      <section className="lot-detail-primary">
        <div className="lot-detail-gallery" aria-label={`Media de ${lot.lot.name}`}>
          {(lot.lot.media.length ? lot.lot.media : lot.lot.imageUrl ? [{ type: "image" as const, url: lot.lot.imageUrl }] : []).map((media, index) =>
            media.type === "video"
              ? <video key={`${media.url}-${index}`} className="lot-detail-media lot-detail-video" src={media.url} controls preload="metadata" />
              : <img key={`${media.url}-${index}`} className="lot-detail-media lot-detail-image" src={media.url} alt={index === 0 ? lot.lot.name : `${lot.lot.name}, imagen ${index + 1}`} />,
          )}
          {!lot.lot.media.length && !lot.lot.imageUrl ? <div className="lot-detail-image" role="img" aria-label={lot.lot.name} /> : null}
        </div>
        <div className="lot-detail-copy">
          <div className="lot-detail-heading-row">
            <span className={`status-pill ${lot.auction.status}`}>
              {lot.auction.statusLabel}
            </span>
            <div className="lot-detail-countdown-slot">{slots.countdown}</div>
          </div>
          <p className="lot-detail-auction-title">{lot.auction.title}</p>
          {lot.lot.number ? <p className="lot-number">Lote {lot.lot.number}</p> : null}
          <h1 className="lot-detail-title">{lot.lot.name}</h1>
          {lot.auction.description ? (
            <p className="lot-detail-description">{lot.auction.description}</p>
          ) : null}
          {lot.currentAmountLabel ? (
            <div className="lot-detail-price">{lot.currentAmountLabel}</div>
          ) : null}
          <p className="lot-detail-sale-methods">{lot.saleMethods}</p>

          {lot.stats ? (
            <div className="lot-detail-stats">
              {lot.stats.map((stat) => (
                <span className="lot-detail-stat" key={stat.label}>
                  <small className="lot-detail-stat-label">{stat.label}</small>
                  <strong className="lot-detail-stat-value">{stat.value}</strong>
                </span>
              ))}
            </div>
          ) : null}

          {lot.youAreWinning ? <p className="winning">{lot.youAreWinningLabel}</p> : null}
          {lot.youWon ? <p className="winning">{lot.youWonLabel}</p> : null}
          <div className="lot-detail-bid-control-slot">{slots.bidControl}</div>
        </div>
      </section>

      <div className="lot-detail-secondary">
        <section id="lot-bid-history" className="lot-history">
          <header className="lot-history-header">
            <div className="lot-history-heading">
              <p className="lot-history-eyebrow">{lot.history.eyebrow}</p>
              <h2 className="lot-history-title">{lot.history.title}</h2>
            </div>
            <span className="lot-history-count">{lot.history.countLabel}</span>
          </header>
          {lot.history.biddingEnabled
            ? lot.history.items.length > 0
              ? (
                <ol className="lot-history-list">
                  {lot.history.items.map((bid) => (
                    <li className={`lot-history-item${bid.highest ? " highest" : ""}`} key={bid.id}>
                      <span className="lot-history-position">{bid.positionLabel}</span>
                      <strong className="lot-history-amount">{bid.amountLabel}</strong>
                      <time className="lot-history-time" dateTime={bid.placedAt}>{bid.placedAtLabel}</time>
                      {bid.highest ? (
                        <span className="lot-history-highest">Más alta</span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              )
              : <p className="lot-history-empty">{lot.history.emptyLabel}</p>
            : <p className="lot-history-empty">{lot.history.unavailableLabel}</p>}
        </section>

        <section id="lot-information" className="lot-additional-info">
          <p className="lot-additional-info-eyebrow">{lot.info.eyebrow}</p>
          <h2 className="lot-additional-info-title">{lot.info.title}</h2>
          <dl className="lot-additional-info-list">
            {lot.info.rows.map((row) => (
              <div className="lot-additional-info-row" key={row.label}>
                <dt className="lot-additional-info-label">{row.label}</dt>
                <dd className="lot-additional-info-value">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
