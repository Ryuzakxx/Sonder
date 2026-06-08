import { createClient } from "@/lib/supabase/client";
import type { Review } from "@/types";

export const reviewService = {
  async getFeed(limit = 20): Promise<Review[]> {
    const supabase = createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*, profile:profiles(*)")
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as Review[];
  },

  async getByUser(userId: string, limit = 20): Promise<Review[]> {
    const supabase = createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*, profile:profiles(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as Review[];
  },

  async getByMedia(mediaId: string, mediaType: string): Promise<Review[]> {
    const supabase = createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*, profile:profiles(*)")
      .eq("media_id", mediaId)
      .eq("media_type", mediaType)
      .order("created_at", { ascending: false });
    return (data ?? []) as Review[];
  },

  async create(payload: {
    userId: string;
    mediaType: string;
    mediaId: string;
    mediaTitle: string;
    mediaCover?: string;
    rating: number;
    body?: string;
  }) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("reviews")
      .upsert({
        user_id: payload.userId,
        media_type: payload.mediaType as Review["media_type"],
        media_id: payload.mediaId,
        media_title: payload.mediaTitle,
        media_cover: payload.mediaCover ?? null,
        rating: payload.rating,
        body: payload.body ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async like(reviewId: string, userId: string) {
    const supabase = createClient();
    await supabase.from("likes").insert({ review_id: reviewId, user_id: userId });
  },

  async unlike(reviewId: string, userId: string) {
    const supabase = createClient();
    await supabase.from("likes")
      .delete()
      .eq("review_id", reviewId)
      .eq("user_id", userId);
  },
};
