import type { LotThemePageProps, SearchThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function SearchThemePage({ content }: SearchThemePageProps) {
  return <PageShell>{content}</PageShell>;
}
