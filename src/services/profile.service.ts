import { createClient } from "@/lib/supabase/client";

export const profileService = {
  async getByUsername(username: string) {
    try {
      const supabase = createClient();
      return await supabase.from("profiles").select("*").eq("username", username).single() as Record<string, unknown> | null;
    } catch { return null; }
  },

  async getById(id: string) {
    try {
      const supabase = createClient();
      return await supabase.from("profiles").select("*").eq("id", id).single() as Record<string, unknown> | null;
    } catch { return null; }
  },

  async update(id: string, data: Record<string, unknown>) {
    try {
      const supabase = createClient();
      await supabase.from("profiles").update(data).eq("id", id);
    } catch {}
  },

  async bootstrapProfile(userId: string, email: string, meta?: Record<string, unknown>) {
    try {
      const supabase = createClient();
      const username = (meta?.username as string) ?? email.split("@")[0] + "_" + Math.random().toString(36).slice(2, 6);
      await supabase.from("profiles").insert({
        id: userId,
        username,
        display_name: (meta?.display_name as string) ?? username,
        email,
      });
    } catch {}
  },
};
