import { apiClient } from "@/lib/apiClient";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_POSTER  = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP = "https://image.tmdb.org/t/p/w1280";
const TMDB_FACE    = "https://image.tmdb.org/t/p/w185";

// ───────────────────────────────── Tipi base ─────────────────────────────────

export type SearchResult = {
  id: string;
  title: string;
  year: string;
  type: "film" | "serie" | "libro";
  cover: string | null;
  overview: string;
  rating: number;
};

export type MediaDetail = {
  id: string;
  tmdbId: number;
  type: "film" | "serie";
  title: string;
  originalTitle: string;
  tagline: string;
  overview: string;
  year: string;
  runtime: number | null;        // minuti (film) o ep avg (serie)
  genres: string[];
  poster: string | null;
  backdrop: string | null;
  rating: number;                // voto TMDB su 10
  voteCount: number;
  status: string;
  language: string;
  director: string | null;       // solo film
  cast: CastMember[];
  similar: SearchResult[];
  // serie extra
  seasons?: number;
  episodes?: number;
  network?: string;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  photo: string | null;
};

// ───────────────────────────────── Raw TMDB ─────────────────────────────────

type RawGenre   = { id: number; name: string };
type RawCast    = { id: number; name: string; character: string; profile_path: string | null; order: number };
type RawCrew    = { id: number; name: string; job: string; department: string };
type RawNetwork = { id: number; name: string };

type RawMovieDetail = {
  id: number;
  title: string;
  original_title: string;
  tagline: string;
  overview: string;
  release_date: string;
  runtime: number | null;
  genres: RawGenre[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  status: string;
  original_language: string;
};

type RawTVDetail = {
  id: number;
  name: string;
  original_name: string;
  tagline: string;
  overview: string;
  first_air_date: string;
  episode_run_time: number[];
  genres: RawGenre[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  status: string;
  original_language: string;
  number_of_seasons: number;
  number_of_episodes: number;
  networks: RawNetwork[];
};

type RawCredits = { cast: RawCast[]; crew: RawCrew[] };
type RawSearchResult = { id: number; title?: string; name?: string; release_date?: string; first_air_date?: string; poster_path?: string | null; vote_average?: number; overview?: string };
type RawSimilar = { results: RawSearchResult[] };

// ───────────────────────────────── Helpers ─────────────────────────────────

function toYear(dateStr: string): string {
  return dateStr ? dateStr.slice(0, 4) : "—";
}

function normalizeSimilar(item: RawSearchResult, type: "film" | "serie"): SearchResult {
  return {
    id: `tmdb-${item.id}`,
    title: item.title ?? item.name ?? "Senza titolo",
    year: toYear(item.release_date ?? item.first_air_date ?? ""),
    type,
    cover: item.poster_path ? `${TMDB_POSTER}${item.poster_path}` : null,
    overview: item.overview ?? "",
    rating: item.vote_average ?? 0,
  };
}

// ───────────────────────────────── Search ─────────────────────────────────

type RawSearchPage = { results: Array<{ id: number; title?: string; name?: string; release_date?: string; first_air_date?: string; poster_path?: string | null; overview?: string; vote_average?: number; media_type?: string }> };

export async function searchMovies(query: string, apiKey: string): Promise<SearchResult[]> {
  const url = `${TMDB_BASE}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=it-IT&page=1`;
  const data = await apiClient<RawSearchPage>(url);
  return data.results.slice(0, 8).map((item): SearchResult => ({
    id: `tmdb-${item.id}`,
    title: item.title ?? item.name ?? "Senza titolo",
    year: toYear(item.release_date ?? ""),
    type: "film",
    cover: item.poster_path ? `${TMDB_POSTER}${item.poster_path}` : null,
    overview: item.overview ?? "",
    rating: item.vote_average ?? 0,
  }));
}

export async function searchTV(query: string, apiKey: string): Promise<SearchResult[]> {
  const url = `${TMDB_BASE}/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=it-IT&page=1`;
  const data = await apiClient<RawSearchPage>(url);
  return data.results.slice(0, 8).map((item): SearchResult => ({
    id: `tmdb-${item.id}`,
    title: item.title ?? item.name ?? "Senza titolo",
    year: toYear(item.first_air_date ?? ""),
    type: "serie",
    cover: item.poster_path ? `${TMDB_POSTER}${item.poster_path}` : null,
    overview: item.overview ?? "",
    rating: item.vote_average ?? 0,
  }));
}

// ───────────────────────────────── Detail ─────────────────────────────────

export async function getMovieDetail(tmdbId: string, apiKey: string): Promise<MediaDetail> {
  const base = `${TMDB_BASE}/movie/${tmdbId}?api_key=${apiKey}&language=it-IT`;
  const [raw, credits, similar] = await Promise.all([
    apiClient<RawMovieDetail>(base),
    apiClient<RawCredits>(`${TMDB_BASE}/movie/${tmdbId}/credits?api_key=${apiKey}&language=it-IT`),
    apiClient<RawSimilar>(`${TMDB_BASE}/movie/${tmdbId}/similar?api_key=${apiKey}&language=it-IT`),
  ]);

  const director = credits.crew.find((c) => c.job === "Director")?.name ?? null;

  return {
    id: `tmdb-${raw.id}`,
    tmdbId: raw.id,
    type: "film",
    title: raw.title,
    originalTitle: raw.original_title,
    tagline: raw.tagline ?? "",
    overview: raw.overview ?? "",
    year: toYear(raw.release_date),
    runtime: raw.runtime ?? null,
    genres: raw.genres.map((g) => g.name),
    poster: raw.poster_path ? `${TMDB_POSTER}${raw.poster_path}` : null,
    backdrop: raw.backdrop_path ? `${TMDB_BACKDROP}${raw.backdrop_path}` : null,
    rating: raw.vote_average,
    voteCount: raw.vote_count,
    status: raw.status,
    language: raw.original_language.toUpperCase(),
    director,
    cast: credits.cast.slice(0, 8).map((c) => ({
      id: c.id, name: c.name, character: c.character,
      photo: c.profile_path ? `${TMDB_FACE}${c.profile_path}` : null,
    })),
    similar: similar.results.slice(0, 8).map((m) => normalizeSimilar(m, "film")),
  };
}

export async function getTVDetail(tmdbId: string, apiKey: string): Promise<MediaDetail> {
  const base = `${TMDB_BASE}/tv/${tmdbId}?api_key=${apiKey}&language=it-IT`;
  const [raw, credits, similar] = await Promise.all([
    apiClient<RawTVDetail>(base),
    apiClient<RawCredits>(`${TMDB_BASE}/tv/${tmdbId}/credits?api_key=${apiKey}&language=it-IT`),
    apiClient<RawSimilar>(`${TMDB_BASE}/tv/${tmdbId}/similar?api_key=${apiKey}&language=it-IT`),
  ]);

  const creator = credits.crew.find((c) => c.job === "Creator" || c.department === "Writing")?.name ?? null;

  return {
    id: `tmdb-${raw.id}`,
    tmdbId: raw.id,
    type: "serie",
    title: raw.name,
    originalTitle: raw.original_name,
    tagline: raw.tagline ?? "",
    overview: raw.overview ?? "",
    year: toYear(raw.first_air_date),
    runtime: raw.episode_run_time?.[0] ?? null,
    genres: raw.genres.map((g) => g.name),
    poster: raw.poster_path ? `${TMDB_POSTER}${raw.poster_path}` : null,
    backdrop: raw.backdrop_path ? `${TMDB_BACKDROP}${raw.backdrop_path}` : null,
    rating: raw.vote_average,
    voteCount: raw.vote_count,
    status: raw.status,
    language: raw.original_language.toUpperCase(),
    director: creator,
    cast: credits.cast.slice(0, 8).map((c) => ({
      id: c.id, name: c.name, character: c.character,
      photo: c.profile_path ? `${TMDB_FACE}${c.profile_path}` : null,
    })),
    similar: similar.results.slice(0, 8).map((m) => normalizeSimilar(m, "serie")),
    seasons: raw.number_of_seasons,
    episodes: raw.number_of_episodes,
    network: raw.networks?.[0]?.name,
  };
}
