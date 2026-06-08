const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p";
const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";

export const tmdbService = {
  posterUrl(path: string | null, size = "w500") {
    return path ? `${IMG}/${size}${path}` : null;
  },
  backdropUrl(path: string | null, size = "w1280") {
    return path ? `${IMG}/${size}${path}` : null;
  },

  async searchMovies(query: string) {
    const r = await fetch(`${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}&language=it-IT`);
    const d = await r.json();
    return d.results ?? [];
  },

  async searchTV(query: string) {
    const r = await fetch(`${BASE}/search/tv?api_key=${KEY}&query=${encodeURIComponent(query)}&language=it-IT`);
    const d = await r.json();
    return d.results ?? [];
  },

  async getMovie(id: string) {
    const r = await fetch(`${BASE}/movie/${id}?api_key=${KEY}&language=it-IT&append_to_response=credits,recommendations,videos`);
    return r.json();
  },

  async getTV(id: string) {
    const r = await fetch(`${BASE}/tv/${id}?api_key=${KEY}&language=it-IT&append_to_response=credits,recommendations`);
    return r.json();
  },

  async getTrending() {
    const r = await fetch(`${BASE}/trending/all/week?api_key=${KEY}&language=it-IT`);
    const d = await r.json();
    return d.results ?? [];
  },

  async getPopularMovies() {
    const r = await fetch(`${BASE}/movie/popular?api_key=${KEY}&language=it-IT`);
    const d = await r.json();
    return d.results ?? [];
  },
};
