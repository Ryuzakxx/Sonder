import type { Metadata } from "next";
import { FeedSection } from "@/components/feed/FeedSection";

export const metadata: Metadata = { title: "Feed" };

export default function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-white mb-5">Feed globale</h1>
      <FeedSection />
    </div>
  );
}
