import type { HomeThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";
export default function HomeThemePage({ content }: HomeThemePageProps) {
  return (
    <PageShell> 
        {content}
    </PageShell>
  );
}
