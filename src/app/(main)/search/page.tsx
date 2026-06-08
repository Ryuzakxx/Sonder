import type { Metadata } from "next";
import { SearchPage } from "@/features/search/SearchPage";

export const metadata: Metadata = { title: "Scopri" };

export default function DiscoverPage() {
  return <SearchPage />;
}
