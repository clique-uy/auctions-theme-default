import type { LotThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function LotThemePage({ market }: LotThemePageProps) {
  return <PageShell>{market}</PageShell>;
}
