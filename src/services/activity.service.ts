import { createClient } from "@/lib/supabase/client";
import type { Activity } from "@/types";

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    user_id: "mock-user",
    action: "watched",
    media_type: "movie",
    media_id: "550",
    media_title: "Fight Club",
    media_cover: "https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    profile: { username: "marco_c", display_name: "Marco C.", avatar_url: null },
  } as unknown as Activity,
  {
    id: "act-2",
    user_id: "mock-user-2",
    action: "reading",
    media_type: "book",
    media_id: "book-dune",
    media_title: "Dune",
    media_cover: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    profile: { username: "sara_films", display_name: "Sara F.", avatar_url: null },
  } as unknown as Activity,
];

export const activityService = {
  async getFeed(limit = 30): Promise<Activity[]> {
    try {
      const supabase = createClient();
      const data = await supabase
        .from("activities")
        .select("*, profile:profiles(*)")
        .order("created_at", { ascending: false })
        .limit(limit) as Activity[] | null;
      if (!data || (Array.isArray(data) && data.length === 0)) return MOCK_ACTIVITIES;
      return data;
    } catch {
      return MOCK_ACTIVITIES;
    }
  },

  async getByUser(userId: string, limit = 30): Promise<Activity[]> {
    try {
      const supabase = createClient();
      const data = await supabase
        .from("activities")
        .select("*, profile:profiles(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit) as Activity[] | null;
      return (data ?? []) as Activity[];
    } catch {
      return [];
    }
  },

  async log(payload: {
    userId: string; action: string; mediaType?: string;
    mediaId?: string; mediaTitle?: string; mediaCover?: string;
  }) {
    try {
      const supabase = createClient();
      await supabase.from("activities").insert({
        user_id: payload.userId,
        action: payload.action,
        media_type: payload.mediaType ?? null,
        media_id: payload.mediaId ?? null,
        media_title: payload.mediaTitle ?? null,
        media_cover: payload.mediaCover ?? null,
      });
    } catch {}
  },
};
