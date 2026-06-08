import { createClient } from "@/lib/supabase/client";

export const favoritesService = {
  async add(userId: string, mediaType: string, mediaId: string, mediaTitle: string, mediaCover?: string) {
    const supabase = createClient();
    await supabase.from("favorites").insert({ user_id: userId, media_type: mediaType, media_id: mediaId, media_title: mediaTitle, media_cover: mediaCover ?? null });
  },
  async remove(userId: string, mediaId: string) {
    const supabase = createClient();
    await supabase.from("favorites").delete().eq("user_id", userId).eq("media_id", mediaId);
  },
  async getByUser(userId: string) {
    const supabase = createClient();
    const { data } = await supabase.from("favorites").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    return data ?? [];
  },
  async isFavorite(userId: string, mediaId: string): Promise<boolean> {
    const supabase = createClient();
    const { data } = await supabase.from("favorites").select("id").eq("user_id", userId).eq("media_id", mediaId).single();
    return !!data;
  },
};
