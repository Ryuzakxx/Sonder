import { Navbar } from "@/components/layout";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />
      <SearchOverlay />
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
