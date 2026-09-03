import type { AccountThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function AccountThemePage({
  content,
  available,
}: AccountThemePageProps) {
  return (
    <PageShell>
      <section className="account-heading">
        <p>MI CUENTA</p>
        <h1>Tu cuenta</h1>
        <span>Gestioná tus datos personales y la seguridad de tu cuenta.</span>
      </section>
      <div className="account-shell">
        {available
          ? content
          : (
            <section className="account-gate" role="status">
              <h2>Cuenta no disponible</h2>
              <p>El acceso a cuentas no está disponible por el momento.</p>
            </section>
          )}
      </div>
    </PageShell>
  );
}
