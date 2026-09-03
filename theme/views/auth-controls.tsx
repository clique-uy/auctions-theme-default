import Link from "next/link";
import type { AuthControlsThemeProps } from "@/components/theme/types";

export default function AuthControls({
  signedIn,
  isAdmin,
  wishlist,
  slots,
}: AuthControlsThemeProps) {
  return (
    <div className="auth-controls theme-header-auth">
      <Link
        className="wishlist-nav-link"
        href={wishlist.href}
        aria-label={wishlist.label}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
        </svg>
        {wishlist.count > 0 && (
          <span className="wishlist-nav-count">{Math.min(wishlist.count, 99)}</span>
        )}
      </Link>
      {signedIn ? (
        <>
          {slots.notifications}
          {isAdmin ? (
            <Link className="theme-header-admin" href="/admin" prefetch={false}>
              Admin
            </Link>
          ) : null}
          {slots.userMenu}
        </>
      ) : (
        <>
          <div className="auth-sign-in-slot">{slots.signIn}</div>
          <div className="auth-sign-up-slot">{slots.signUp}</div>
        </>
      )}
    </div>
  );
}
