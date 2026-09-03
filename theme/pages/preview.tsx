import type { LotThemePageProps, PreviewThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function PreviewThemePage({ title, description, form }: PreviewThemePageProps) {
  return <PageShell>
    <section className="preview-panel">
      <h1 className="preview-title">{title}</h1>
      <p className="preview-description">{description}</p>
      {form}
    </section>
  </PageShell>;
}
