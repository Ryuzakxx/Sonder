import { searchMovies, searchTV } from "./tmdb";
import { searchBooks } from "./books";
import type { SearchResult } from "./tmdb";

export type { SearchResult };

export type SearchCategory = "tutto" | "film" | "serie" | "libri";

export type SearchResults = {
  film: SearchResult[];
  serie: SearchResult[];
  libri: SearchResult[];
};

export async function universalSearch(
  query: string,
  category: SearchCategory,
  tmdbKey: string,
  booksKey?: string
): Promise<SearchResults> {
  if (!query.trim()) return { film: [], serie: [], libri: [] };

  const fetchFilm  = (category === "tutto" || category === "film")  ? searchMovies(query, tmdbKey) : Promise.resolve([]);
  const fetchSerie = (category === "tutto" || category === "serie") ? searchTV(query, tmdbKey)     : Promise.resolve([]);
  const fetchLibri = (category === "tutto" || category === "libri") ? searchBooks(query, booksKey) : Promise.resolve([]);

  const [film, serie, libri] = await Promise.allSettled([fetchFilm, fetchSerie, fetchLibri]);

  return {
    film:  film.status  === "fulfilled" ? film.value  : [],
    serie: serie.status === "fulfilled" ? serie.value : [],
    libri: libri.status === "fulfilled" ? libri.value : [],
  };
}
