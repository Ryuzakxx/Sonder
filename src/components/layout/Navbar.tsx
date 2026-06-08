"use client";
import { useSearchContext } from "@/providers/SearchProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { useState } from "react";
import { authService } from "@/services/auth.service";

export function Navbar() {
  const { open } = useSearchContext();
  const { user } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    try {
      await authService.signOut();
      router.push("/sign-in");
      router.refresh();
    } catch {
      toast.error("Errore nel logout");
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d0d]/90 backdrop-blur border-b border-[#1a1a1a]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <a href="/" className="text-white font-bold text-lg tracking-tight hover:text-[#c8a97e] transition-colors">
          Sonder
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-[#666] hover:text-white text-sm transition-colors">Home</a>
          <a href="/feed" className="text-[#666] hover:text-white text-sm transition-colors">Feed</a>
          <a href="/search" className="text-[#666] hover:text-white text-sm transition-colors">Scopri</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={open}
            className="flex items-center gap-2 text-[#555] hover:text-white transition-colors text-sm bg-[#161616] border border-[#1e1e1e] rounded-lg px-3 py-1.5"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="hidden sm:block">Cerca</span>
            <kbd className="hidden sm:block text-xs border border-[#2a2a2a] rounded px-1 py-px">⌘K</kbd>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2"
              >
                <Avatar
                  src={user.user_metadata?.avatar_url}
                  name={user.user_metadata?.display_name ?? user.email ?? "U"}
                  size={30}
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-xl z-50">
                  <a
                    href={`/profile/${user.user_metadata?.username ?? user.id}`}
                    className="block px-4 py-2.5 text-sm text-[#ccc] hover:bg-[#1e1e1e] hover:text-white transition-colors"
                  >
                    Il mio profilo
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2.5 text-sm text-[#888] hover:bg-[#1e1e1e] hover:text-red-400 transition-colors"
                  >
                    Esci
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/sign-in"
              className="text-sm text-[#c8a97e] hover:text-[#e8c99e] transition-colors"
            >
              Accedi
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
