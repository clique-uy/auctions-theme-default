import Link from "next/link";

export default function SiteNavigation() {
  return (
    <nav id="site-navigation" className="site-navigation flex items-center gap-1 max-md:gap-0" aria-label="Navegación principal">
      <Link className="site-navigation-link site-navigation-home rounded-theme-control px-3 py-2 text-xs font-semibold text-theme-text-muted transition-colors hover:bg-theme-brand-soft hover:text-theme-brand max-md:hidden" href="/">Inicio</Link>
      <Link className="site-navigation-link site-navigation-account rounded-theme-control px-3 py-2 text-xs font-semibold text-theme-text-muted transition-colors hover:bg-theme-brand-soft hover:text-theme-brand" href="/account">Mi cuenta</Link>
      <Link className="site-navigation-link site-navigation-admin rounded-theme-control px-3 py-2 text-xs font-semibold text-theme-text-muted transition-colors hover:bg-theme-brand-soft hover:text-theme-brand max-md:hidden" href="/admin">Administrar</Link>
      <Link className="site-navigation-link site-navigation-search rounded-theme-control px-3 py-2 text-xs font-semibold text-theme-text-muted transition-colors hover:bg-theme-brand-soft hover:text-theme-brand" href="/search">Buscar</Link>
    </nav>
  );
}
