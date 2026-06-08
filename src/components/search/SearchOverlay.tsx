"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/search";
import { useSearch } from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/Skeleton";

const TYPE_LABELS: Record<string, string> = { film: "Film", serie: "Serie TV", libro: "Libro" };

export function SearchOverlay() {
  const { isOpen, query, close, setQuery } = useSearchStore();
  const { results, isLoading } = useSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); isOpen ? close() : useSearchStore.getState().open(); }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const allResults = [
    ...results.films.map(r => ({ ...r, type: "film" as const })),
    ...results.serie.map(r => ({ ...r, type: "serie" as const })),
    ...results.libri.map(r => ({ ...r, type: "libro" as const })),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="w-full max-w-xl mx-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1e1e1e]">
          <svg className="text-[#555] shrink-0" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cerca film, serie, libri..."
            className="flex-1 bg-transparent text-white placeholder-[#444] outline-none text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-[#555] hover:text-white transition-colors text-xs">✕</button>
          )}
          <kbd className="text-[#444] text-xs border border-[#2a2a2a] rounded px-1.5 py-0.5 hidden sm:block">ESC</kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && query && (
            <div className="p-4 space-y-2">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12" />)}
            </div>
          )}

          {!isLoading && query && allResults.length === 0 && (
            <div className="py-10 text-center text-[#444] text-sm">Nessun risultato per &ldquo;{query}&rdquo;</div>
          )}

          {!isLoading && allResults.length > 0 && (
            <div className="py-2">
              {(["film", "serie", "libro"] as const).map(type => {
                const items = allResults.filter(r => r.type === type);
                if (!items.length) return null;
                return (
                  <div key={type}>
                    <div className="px-4 py-2 text-xs text-[#555] uppercase tracking-wider font-medium">{TYPE_LABELS[type]}</div>
                    {items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => { router.push(`/media/${item.type}/${item.id}`); close(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#1e1e1e] transition-colors text-left"
                      >
                        {item.cover
                          ? <img src={item.cover} alt="" className="w-8 h-10 object-cover rounded shrink-0" loading="lazy" />
                          : <div className="w-8 h-10 bg-[#222] rounded shrink-0" />}
                        <div className="min-w-0">
                          <p className="text-white text-sm truncate">{item.title}</p>
                          <p className="text-[#555] text-xs">{item.year}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {!query && (
            <div className="py-10 text-center text-[#333] text-sm">Inizia a digitare per cercare</div>
          )}
        </div>
      </div>
    </div>
  );
}
