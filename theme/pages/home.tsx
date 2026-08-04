import type { HomeThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function HomeThemePage({ market }: HomeThemePageProps) {
  return <PageShell>{market}</PageShell>;
}
