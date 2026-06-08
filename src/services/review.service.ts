import { createClient } from "@/lib/supabase/client";
import type { Review } from "@/types";

const MOCK_REVIEWS: Review[] = [
  {
    id: "mock-1",
    user_id: "mock-user",
    media_type: "movie",
    media_id: "238",
    media_title: "Il Padrino",
    media_cover: "https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsLe1rhdoA0sn.jpg",
    rating: 5,
    body: "Un capolavoro senza tempo. La regia di Coppola è impeccabile, i personaggi indimenticabili.",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    profile: { username: "marco_c", display_name: "Marco C.", avatar_url: null },
  } as unknown as Review,
  {
    id: "mock-2",
    user_id: "mock-user-2",
    media_type: "movie",
    media_id: "155",
    media_title: "Il Cavaliere Oscuro",
    media_cover: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 5,
    body: "Heath Ledger trasforma ogni scena. Film che ridefinisce il genere supereroistico.",
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    profile: { username: "sara_films", display_name: "Sara F.", avatar_url: null },
  } as unknown as Review,
  {
    id: "mock-3",
    user_id: "mock-user-3",
    media_type: "book",
    media_id: "book-1984",
    media_title: "1984",
    media_cover: null,
    rating: 4,
    body: "Orwell aveva visto tutto. Disturbante e necessario come non mai.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    profile: { username: "luca_reads", display_name: "Luca R.", avatar_url: null },
  } as unknown as Review,
];

export const reviewService = {
  async getFeed(limit = 20): Promise<Review[]> {
    try {
      const supabase = createClient();
      const data = await supabase
        .from("reviews")
        .select("*, profile:profiles(*)")
        .order("created_at", { ascending: false })
        .limit(limit) as Review[] | null;
      if (!data || (Array.isArray(data) && data.length === 0)) return MOCK_REVIEWS;
      return data;
    } catch {
      return MOCK_REVIEWS;
    }
  },

  async getByUser(userId: string, limit = 20): Promise<Review[]> {
    try {
      const supabase = createClient();
      const data = await supabase
        .from("reviews")
        .select("*, profile:profiles(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit) as Review[] | null;
      return (data ?? []) as Review[];
    } catch {
      return [];
    }
  },

  async getByMedia(mediaId: string, mediaType: string): Promise<Review[]> {
    try {
      const supabase = createClient();
      const data = await supabase
        .from("reviews")
        .select("*, profile:profiles(*)")
        .eq("media_id", mediaId)
        .eq("media_type", mediaType)
        .order("created_at", { ascending: false }) as Review[] | null;
      return (data ?? []) as Review[];
    } catch {
      return [];
    }
  },

  async create(payload: {
    userId: string; mediaType: string; mediaId: string;
    mediaTitle: string; mediaCover?: string; rating: number; body?: string;
  }) {
    const supabase = createClient();
    return supabase.from("reviews").upsert({
      user_id: payload.userId,
      media_type: payload.mediaType,
      media_id: payload.mediaId,
      media_title: payload.mediaTitle,
      media_cover: payload.mediaCover ?? null,
      rating: payload.rating,
      body: payload.body ?? null,
    }).single();
  },

  async like(reviewId: string, userId: string) {
    try { const supabase = createClient(); await supabase.from("likes").insert({ review_id: reviewId, user_id: userId }); } catch {}
  },

  async unlike(reviewId: string, userId: string) {
    try {
      const supabase = createClient();
      await supabase.from("likes").delete().eq("review_id", reviewId).eq("user_id", userId);
    } catch {}
  },
};
