import type { NotificationBellThemeProps } from "@/components/theme/types";

export default function NotificationBell({
  open,
  loading,
  unreadCount,
  triggerLabel,
  panelLabel,
  unreadLabel,
  loadingLabel,
  emptyLabel,
  items,
  push,
  toast,
  actions,
}: NotificationBellThemeProps) {
  return (
    <>
      <button
        type="button"
        className="notification-bell"
        aria-label={triggerLabel}
        aria-expanded={open}
        onClick={actions.toggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
        </svg>
        {unreadCount > 0
          ? <span className="notification-badge">{Math.min(unreadCount, 99)}</span>
          : null}
      </button>

      {open
        ? (
          <section className="notification-panel" aria-label={panelLabel}>
            <header>
              <div>
                <strong>{panelLabel}</strong>
                <small>{unreadLabel}</small>
              </div>
              {unreadCount > 0
                ? <button type="button" onClick={actions.markAllRead}>Marcar todas</button>
                : null}
            </header>

            <div className="notification-push-setting">
              <div>
                <strong>{push.title}</strong>
                <small>{push.description}</small>
              </div>
              <button
                type="button"
                disabled={push.busy || push.available === false}
                onClick={actions.togglePush}
              >
                {push.toggleLabel}
              </button>
              {push.message ? <p>{push.message}</p> : null}
            </div>

            <div className="notification-list">
              {loading
                ? <p className="notification-empty">{loadingLabel}</p>
                : null}
              {!loading && items.length === 0
                ? <p className="notification-empty">{emptyLabel}</p>
                : null}
              {items.map((item) => (
                <button
                  type="button"
                  className={`notification-item${item.unread ? " unread" : ""}`}
                  key={item.id}
                  onClick={() => actions.select(item.id)}
                >
                  <span className="notification-dot" aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.body}</small>
                    <time dateTime={item.createdAt}>{item.createdAtLabel}</time>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )
        : null}

      {toast
        ? (
          <button
            type="button"
            className="notification-toast"
            onClick={() => actions.select(toast.item.id)}
          >
            <span>{toast.label}</span>
            <strong>{toast.item.title}</strong>
            <small>{toast.item.body}</small>
          </button>
        )
        : null}
    </>
  );
}
