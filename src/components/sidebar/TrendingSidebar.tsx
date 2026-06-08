"use client";
import { useEffect, useState } from "react";
import { tmdbService } from "@/services/tmdb.service";
import { Skeleton } from "@/components/ui/Skeleton";

interface TrendItem { id: number; title?: string; name?: string; poster_path: string | null; vote_average: number; media_type: string; }

export function TrendingSidebar() {
  const [items, setItems] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tmdbService.getTrending()
      .then(data => setItems(data.slice(0, 6)))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-sm font-semibold text-[#888] uppercase tracking-wider mb-3">In tendenza</h2>
      {loading ? (
        <div className="space-y-2">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14" />)}</div>
      ) : items.length === 0 ? (
        <p className="text-xs text-[#444]">Configura TMDB_API_KEY per i trending</p>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <a
              key={item.id}
              href={`/media/${item.media_type === "tv" ? "serie" : "film"}/${item.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#141414] transition-colors"
            >
              {item.poster_path
                ? <img src={tmdbService.posterUrl(item.poster_path, "w92") ?? ""} alt="" className="w-8 h-10 object-cover rounded shrink-0" loading="lazy" />
                : <div className="w-8 h-10 bg-[#1e1e1e] rounded shrink-0" />}
              <div className="min-w-0">
                <p className="text-white text-xs font-medium truncate">{item.title ?? item.name}</p>
                <p className="text-[#555] text-xs">★ {item.vote_average?.toFixed(1)}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
