import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";

function generateUsername(email: string): string {
  const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const suffix = Math.floor(Math.random() * 9000) + 1000;
  return `${base}${suffix}`;
}

export const profileService = {
  async bootstrapProfile(userId: string, email: string, preferredUsername?: string) {
    const supabase = createClient();
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();
    if (existing) return;

    const username = preferredUsername || generateUsername(email);
    await supabase.from("profiles").insert({
      id: userId,
      username,
      display_name: username,
    });
  },

  async getByUsername(username: string): Promise<Profile | null> {
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();
    return data as Profile | null;
  },

  async getById(id: string): Promise<Profile | null> {
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    return data as Profile | null;
  },

  async update(id: string, updates: Partial<Profile>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Profile;
  },
};
