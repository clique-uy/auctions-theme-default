import type { AuctionThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function AuctionThemePage({ market }: AuctionThemePageProps) {
  return <PageShell>{market}</PageShell>;
}
