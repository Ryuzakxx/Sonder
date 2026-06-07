import { apiClient } from "@/lib/apiClient";
import type { SearchResult } from "./tmdb";

const BOOKS_BASE = "https://www.googleapis.com/books/v1";

type BookVolume = {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
    description?: string;
    averageRating?: number;
  };
};

type BooksResponse = {
  items?: BookVolume[];
  totalItems?: number;
};

export async function searchBooks(query: string, apiKey?: string): Promise<SearchResult[]> {
  const keyParam = apiKey ? `&key=${apiKey}` : "";
  const url = `${BOOKS_BASE}/volumes?q=${encodeURIComponent(query)}&maxResults=8&langRestrict=it${keyParam}`;
  const data = await apiClient<BooksResponse>(url);

  return (data.items ?? []).map((item): SearchResult => {
    const info = item.volumeInfo;
    const rawDate = info.publishedDate ?? "";
    const cover =
      info.imageLinks?.thumbnail ??
      info.imageLinks?.smallThumbnail ??
      null;
    return {
      id: `book-${item.id}`,
      title: info.title ?? "Senza titolo",
      year: rawDate ? rawDate.slice(0, 4) : "—",
      type: "libro",
      cover: cover ? cover.replace("http://", "https://") : null,
      overview: info.description ?? "",
      rating: info.averageRating ?? 0,
    };
  });
}
