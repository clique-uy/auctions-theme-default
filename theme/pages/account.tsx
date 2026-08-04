import type { AccountThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function AccountThemePage({
  account,
  available,
}: AccountThemePageProps) {
  return (
    <PageShell>
      <header className="starter-heading">
        <p>Cuenta</p>
        <h1>Tu actividad</h1>
        <span>Gestioná tu perfil, tus ofertas y tus resultados.</span>
      </header>
      {available ? account : (
        <section className="market-state" role="status">
          Las cuentas no están disponibles en este momento.
        </section>
      )}
    </PageShell>
  );
}
