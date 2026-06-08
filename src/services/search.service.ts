import { tmdbService } from "./tmdb.service";
import { booksService } from "./books.service";
import type { MediaSearchResult } from "@/types";

export const searchService = {
  async search(query: string): Promise<{
    films: MediaSearchResult[];
    serie: MediaSearchResult[];
    libri: MediaSearchResult[];
  }> {
    if (!query.trim()) return { films: [], serie: [], libri: [] };

    const [movies, shows, books] = await Promise.allSettled([
      tmdbService.searchMovies(query),
      tmdbService.searchTV(query),
      booksService.search(query),
    ]);

    const films: MediaSearchResult[] = movies.status === "fulfilled"
      ? movies.value.slice(0, 5).map((m: { id: number; title: string; release_date?: string; poster_path?: string | null; overview?: string; vote_average?: number }) => ({
          id: String(m.id),
          type: "film" as const,
          title: m.title,
          year: m.release_date?.slice(0, 4) ?? "",
          cover: tmdbService.posterUrl(m.poster_path ?? null, "w300"),
          description: m.overview,
          rating: m.vote_average,
        }))
      : [];

    const serie: MediaSearchResult[] = shows.status === "fulfilled"
      ? shows.value.slice(0, 5).map((s: { id: number; name: string; first_air_date?: string; poster_path?: string | null; overview?: string; vote_average?: number }) => ({
          id: String(s.id),
          type: "serie" as const,
          title: s.name,
          year: s.first_air_date?.slice(0, 4) ?? "",
          cover: tmdbService.posterUrl(s.poster_path ?? null, "w300"),
          description: s.overview,
          rating: s.vote_average,
        }))
      : [];

    const libri: MediaSearchResult[] = books.status === "fulfilled"
      ? books.value.slice(0, 5).map((b: { id: string; volumeInfo: { title: string; publishedDate?: string; imageLinks?: { thumbnail?: string }; description?: string; averageRating?: number } }) => ({
          id: b.id,
          type: "libro" as const,
          title: b.volumeInfo.title,
          year: b.volumeInfo.publishedDate?.slice(0, 4) ?? "",
          cover: b.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") ?? null,
          description: b.volumeInfo.description,
          rating: b.volumeInfo.averageRating,
        }))
      : [];

    return { films, serie, libri };
  },
};
