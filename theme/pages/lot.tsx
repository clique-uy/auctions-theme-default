import type { LotThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function LotThemePage({ content }: LotThemePageProps) {
  return <PageShell>{content}</PageShell>;
}
