import type { WishlistThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function WishlistThemePage({ market }: WishlistThemePageProps) {
  return <PageShell>{market}</PageShell>;
}
