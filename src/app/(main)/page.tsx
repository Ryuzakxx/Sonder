import type { Metadata } from "next";
import { FeedSection } from "@/components/feed/FeedSection";
import { TrendingSidebar } from "@/components/sidebar/TrendingSidebar";

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
      <div>
        <h1 className="text-xl font-semibold text-white mb-5">Feed</h1>
        <FeedSection />
      </div>
      <aside className="hidden lg:block">
        <TrendingSidebar />
      </aside>
    </div>
  );
}
