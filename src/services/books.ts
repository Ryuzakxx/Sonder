import { apiClient } from "@/lib/apiClient";
import type { SearchResult } from "./tmdb";

const BOOKS_BASE = "https://www.googleapis.com/books/v1";

export type BookDetail = {
  id: string;
  type: "libro";
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  year: string;
  description: string;
  genres: string[];
  cover: string | null;
  rating: number;
  ratingCount: number;
  pageCount: number | null;
  language: string;
  isbn: string | null;
  similar: SearchResult[];
};

type BookVolume = {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    categories?: string[];
    imageLinks?: { thumbnail?: string; smallThumbnail?: string; large?: string; extraLarge?: string };
    averageRating?: number;
    ratingsCount?: number;
    pageCount?: number;
    language?: string;
    industryIdentifiers?: Array<{ type: string; identifier: string }>;
  };
};

type BooksResponse = {
  items?: BookVolume[];
  totalItems?: number;
};

function coverUrl(info: BookVolume["volumeInfo"]): string | null {
  const raw =
    info.imageLinks?.extraLarge ??
    info.imageLinks?.large ??
    info.imageLinks?.thumbnail ??
    info.imageLinks?.smallThumbnail ??
    null;
  return raw ? raw.replace("http://", "https://") : null;
}

export async function searchBooks(query: string, apiKey?: string): Promise<SearchResult[]> {
  const keyParam = apiKey ? `&key=${apiKey}` : "";
  const url = `${BOOKS_BASE}/volumes?q=${encodeURIComponent(query)}&maxResults=8&langRestrict=it${keyParam}`;
  const data = await apiClient<BooksResponse>(url);
  return (data.items ?? []).map((item): SearchResult => ({
    id: `book-${item.id}`,
    title: item.volumeInfo.title ?? "Senza titolo",
    year: (item.volumeInfo.publishedDate ?? "").slice(0, 4) || "—",
    type: "libro",
    cover: coverUrl(item.volumeInfo),
    overview: item.volumeInfo.description ?? "",
    rating: item.volumeInfo.averageRating ?? 0,
  }));
}

export async function getBookDetail(bookId: string, apiKey?: string): Promise<BookDetail> {
  const keyParam = apiKey ? `?key=${apiKey}` : "";
  const vol = await apiClient<BookVolume>(`${BOOKS_BASE}/volumes/${bookId}${keyParam}`);
  const info = vol.volumeInfo;

  // cerca libri simili dello stesso autore / categoria
  const searchTerm = info.authors?.[0] ?? info.title ?? "bestseller";
  const keyParam2 = apiKey ? `&key=${apiKey}` : "";
  const similar = await apiClient<BooksResponse>(
    `${BOOKS_BASE}/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=6${keyParam2}`
  );

  const isbn =
    info.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier ??
    info.industryIdentifiers?.find((i) => i.type === "ISBN_10")?.identifier ??
    null;

  return {
    id: `book-${vol.id}`,
    type: "libro",
    title: info.title ?? "Senza titolo",
    authors: info.authors ?? [],
    publisher: info.publisher ?? "—",
    publishedDate: info.publishedDate ?? "",
    year: (info.publishedDate ?? "").slice(0, 4) || "—",
    description: info.description ?? "",
    genres: info.categories ?? [],
    cover: coverUrl(info),
    rating: info.averageRating ?? 0,
    ratingCount: info.ratingsCount ?? 0,
    pageCount: info.pageCount ?? null,
    language: (info.language ?? "it").toUpperCase(),
    isbn,
    similar: (similar.items ?? [])
      .filter((i) => i.id !== vol.id)
      .slice(0, 6)
      .map((item): SearchResult => ({
        id: `book-${item.id}`,
        title: item.volumeInfo.title ?? "Senza titolo",
        year: (item.volumeInfo.publishedDate ?? "").slice(0, 4) || "—",
        type: "libro",
        cover: coverUrl(item.volumeInfo),
        overview: item.volumeInfo.description ?? "",
        rating: item.volumeInfo.averageRating ?? 0,
      })),
  };
}
