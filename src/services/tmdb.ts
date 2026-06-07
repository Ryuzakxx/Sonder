import { apiClient } from "@/lib/apiClient";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w300";

export type SearchResult = {
  id: string;
  title: string;
  year: string;
  type: "film" | "serie" | "libro";
  cover: string | null;
  overview: string;
  rating: number;
};

type TMDBMovie = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
  overview?: string;
  vote_average?: number;
  media_type?: string;
};

type TMDBResponse = {
  results: TMDBMovie[];
};

function normalizeMovie(item: TMDBMovie, forceType?: "film" | "serie"): SearchResult {
  const type = forceType ?? (item.media_type === "tv" ? "serie" : "film");
  const rawDate = item.release_date ?? item.first_air_date ?? "";
  return {
    id: `tmdb-${item.id}`,
    title: item.title ?? item.name ?? "Senza titolo",
    year: rawDate ? rawDate.slice(0, 4) : "—",
    type,
    cover: item.poster_path ? `${TMDB_IMG}${item.poster_path}` : null,
    overview: item.overview ?? "",
    rating: item.vote_average ?? 0,
  };
}

export async function searchMovies(query: string, apiKey: string): Promise<SearchResult[]> {
  const url = `${TMDB_BASE}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=it-IT&page=1`;
  const data = await apiClient<TMDBResponse>(url);
  return data.results.slice(0, 8).map((item) => normalizeMovie(item, "film"));
}

export async function searchTV(query: string, apiKey: string): Promise<SearchResult[]> {
  const url = `${TMDB_BASE}/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=it-IT&page=1`;
  const data = await apiClient<TMDBResponse>(url);
  return data.results.slice(0, 8).map((item) => normalizeMovie(item, "serie"));
}
