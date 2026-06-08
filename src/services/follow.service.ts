import { createClient } from "@/lib/supabase/client";

export const followService = {
  async follow(followerId: string, followingId: string) {
    const supabase = createClient();
    await supabase.from("follows").insert({ follower_id: followerId, following_id: followingId });
  },
  async unfollow(followerId: string, followingId: string) {
    const supabase = createClient();
    await supabase.from("follows").delete()
      .eq("follower_id", followerId)
      .eq("following_id", followingId);
  },
  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const supabase = createClient();
    const { data } = await supabase.from("follows")
      .select("follower_id")
      .eq("follower_id", followerId)
      .eq("following_id", followingId)
      .single();
    return !!data;
  },
};
