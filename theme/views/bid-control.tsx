import type { BidControlThemeProps } from "@/components/theme/types";

export default function BidControl({
  context,
  currency,
  ids,
  manualBid,
  automaticBid,
  canSubmit,
  controlsDisabled,
  message,
  messageTone,
  copy,
  actions,
}: BidControlThemeProps) {
  const compact = context === "card";
  const showAutomaticBid = Boolean(
    automaticBid && actions.changeMaximumValue && actions.submitAutomatic,
  );
  const automaticHintId = `${ids.maximumInput}-hint`;
  const contextClassName = context === "lot-detail"
    ? " lot-detail-bid-form"
    : context === "live-auction"
      ? " live-event-bid-form"
      : " card-bid-form";

  return (
    <div className={`bid-form${contextClassName}`}>
      <form
        className="bid-action"
        onSubmit={(event) => {
          event.preventDefault();
          actions.submit();
        }}
      >
        <label className="bid-label" htmlFor={ids.input}>
          Tu oferta
          <span className="sr-only"> ({currency})</span>
        </label>
        <div className="bid-action-controls">
          <div className="bid-amount-field">
            <span className="bid-currency" aria-hidden="true">{currency}</span>
            <input
              id={ids.input}
              className="bid-input"
              inputMode="decimal"
              value={manualBid.value}
              onChange={(event) => actions.changeValue(event.target.value)}
              disabled={controlsDisabled}
              aria-describedby={ids.message}
            />
          </div>
          <button className="bid-submit" type="submit" disabled={!canSubmit}>
            {manualBid.pending ? "ENVIANDO…" : copy.submit}
          </button>
        </div>
      </form>

      {showAutomaticBid && automaticBid ? (
        <>
          <p className="bid-mode-divider"><span>o</span></p>
          <form
            className={`automatic-bid-action${automaticBid.active ? " is-active" : ""}`}
            onSubmit={(event) => {
              event.preventDefault();
              actions.submitAutomatic?.();
            }}
          >
            <div className="automatic-bid-heading">
              <label className="automatic-bid-label" htmlFor={ids.maximumInput}>
                Máximo automático
                <span className="sr-only"> ({currency})</span>
              </label>
              {automaticBid.active ? (
                <span className="automatic-bid-status">Activa</span>
              ) : null}
            </div>
            <p id={automaticHintId} className="automatic-bid-description">
              {copy.automaticDescription}
            </p>
            <div className="automatic-bid-controls">
              <div className="bid-amount-field">
                <span className="bid-currency" aria-hidden="true">{currency}</span>
                <input
                  id={ids.maximumInput}
                  className="automatic-bid-input"
                  inputMode="decimal"
                  value={automaticBid.value}
                  placeholder="Ingresa tu máximo"
                  onChange={(event) => actions.changeMaximumValue?.(event.target.value)}
                  disabled={controlsDisabled}
                  aria-describedby={`${automaticHintId} ${ids.message}`}
                />
              </div>
              <button className="automatic-bid-submit" type="submit" disabled={!canSubmit}>
                {automaticBid.pending
                  ? "GUARDANDO…"
                  : automaticBid.active ? "ACTUALIZAR" : "ACTIVAR"}
              </button>
            </div>
          </form>
        </>
      ) : null}

      <span id={ids.message} className={`bid-message ${messageTone}`} role="status">
        {message}
      </span>
      {compact ? null : <small className="bid-scope">{copy.disclaimer}</small>}
    </div>
  );
}
