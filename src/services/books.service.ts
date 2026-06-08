const BASE = "https://www.googleapis.com/books/v1";
const KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY ?? "";

export const booksService = {
  async search(query: string) {
    const url = KEY
      ? `${BASE}/volumes?q=${encodeURIComponent(query)}&key=${KEY}&maxResults=10&langRestrict=it`
      : `${BASE}/volumes?q=${encodeURIComponent(query)}&maxResults=10`;
    const r = await fetch(url);
    const d = await r.json();
    return d.items ?? [];
  },

  async getVolume(id: string) {
    const r = await fetch(`${BASE}/volumes/${id}${KEY ? `?key=${KEY}` : ""}`);
    return r.json();
  },

  coverUrl(book: { volumeInfo: { imageLinks?: { thumbnail?: string } } }) {
    return book.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") ?? null;
  },
};
