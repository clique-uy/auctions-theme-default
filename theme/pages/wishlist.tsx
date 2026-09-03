import type { WishlistThemePageProps } from "@/components/theme/types";
import PageShell from "../components/page-shell";

export default function WishlistThemePage({ content }: WishlistThemePageProps) {
  return <PageShell>{content}</PageShell>;
}
