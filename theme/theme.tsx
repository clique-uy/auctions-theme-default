import { defineTheme } from "@/components/theme/types";
import Home from "./pages/home";
import Auction from "./pages/auction";
import Lot from "./pages/lot";
import Account from "./pages/account";
import WishlistPage from "./pages/wishlist";
import SearchPage from "./pages/search";
import PreviewAccess from "./pages/preview";
import Header from "./shell/header";
import Footer from "./shell/footer";
import Navigation from "./shell/navigation";
import AuthControls from "./views/auth-controls";
import BidControl from "./views/bid-control";
import NotificationBell from "./views/notification-bell";
import Hero from "./views/hero";
import LiveAuction from "./views/live-auction";
import Wishlist from "./views/wishlist";
import LotGrid from "./views/lot-grid";
import LotCard from "./views/lot-card";
import QuestionAndAnswer from "./blocks/question-and-answer";
import HeroBlock from "./blocks/hero";
import AuctionCard from "./views/auction-card";
import CategoryGridBlock from "./views/category-grid";
import Search from "./views/search";
export default defineTheme({
  meta: { id: "default", contractVersion: "auction-web-v5" },
  blocks: {
    categoryLabel: "Tema",
    blocks: {
      QuestionAndAnswer,
      Hero: HeroBlock,
    },
  },
  pages: { Home, Auction, Lot, Account, Wishlist: WishlistPage, Search: SearchPage },
  shell: { Header, Footer, Navigation },
  components: { AuthControls, BidControl, NotificationBell, LotCard, AuctionCard },
  views: { Hero, LiveAuction, Wishlist, LotGrid, CategoryGrid: CategoryGridBlock, Search },
  system: { PreviewAccess },
});
