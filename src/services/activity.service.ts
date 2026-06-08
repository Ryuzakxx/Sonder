import { createClient } from "@/lib/supabase/client";
import type { Activity } from "@/types";

export const activityService = {
  async getFeed(limit = 30): Promise<Activity[]> {
    const supabase = createClient();
    const { data } = await supabase
      .from("activities")
      .select("*, profile:profiles(*)")
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as Activity[];
  },

  async getByUser(userId: string, limit = 30): Promise<Activity[]> {
    const supabase = createClient();
    const { data } = await supabase
      .from("activities")
      .select("*, profile:profiles(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as Activity[];
  },

  async log(payload: {
    userId: string;
    action: string;
    mediaType?: string;
    mediaId?: string;
    mediaTitle?: string;
    mediaCover?: string;
  }) {
    const supabase = createClient();
    await supabase.from("activities").insert({
      user_id: payload.userId,
      action: payload.action,
      media_type: payload.mediaType ?? null,
      media_id: payload.mediaId ?? null,
      media_title: payload.mediaTitle ?? null,
      media_cover: payload.mediaCover ?? null,
    });
  },
};
