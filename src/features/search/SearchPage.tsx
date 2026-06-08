"use client";
import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const { results, isLoading } = useSearch(query);
  const router = useRouter();

  const total = results.films.length + results.serie.length + results.libri.length;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-white mb-5">Scopri</h1>
      <div className="relative mb-6">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Cerca film, serie, libri..."
          className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-[#444] focus:outline-none focus:border-[#c8a97e] transition-colors"
        />
      </div>

      {isLoading && (
        <div className="space-y-3">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
      )}

      {!isLoading && query && total === 0 && (
        <p className="text-[#444] text-sm text-center py-8">Nessun risultato per &ldquo;{query}&rdquo;</p>
      )}

      {!isLoading && ([
        { key: "films", label: "Film", items: results.films, type: "film" },
        { key: "serie", label: "Serie TV", items: results.serie, type: "serie" },
        { key: "libri", label: "Libri", items: results.libri, type: "libro" },
      ] as const).map(({ key, label, items, type }) => items.length > 0 && (
        <div key={key} className="mb-6">
          <h2 className="text-xs text-[#555] uppercase tracking-wider font-medium mb-3">{label}</h2>
          <div className="space-y-2">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => router.push(`/media/${type}/${item.id}`)}
                className="w-full flex items-center gap-4 p-3 bg-[#141414] border border-[#1e1e1e] hover:border-[#2a2a2a] rounded-xl transition-colors text-left"
              >
                {item.cover
                  ? <img src={item.cover} alt="" className="w-10 h-14 object-cover rounded-lg shrink-0" loading="lazy" />
                  : <div className="w-10 h-14 bg-[#1e1e1e] rounded-lg shrink-0" />}
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.title}</p>
                  <p className="text-[#555] text-xs mt-0.5">{item.year}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
