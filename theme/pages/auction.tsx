import type { AuctionThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function AuctionThemePage({ content }: AuctionThemePageProps) {
  return <PageShell>{content}</PageShell>;
}
