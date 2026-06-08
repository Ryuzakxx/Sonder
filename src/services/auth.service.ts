import { createClient } from "@/lib/supabase/client";
import { profileService } from "./profile.service";

export const authService = {
  async signUp(email: string, password: string, username: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) throw error;
    if (data.user) {
      await profileService.bootstrapProfile(data.user.id, email, username);
    }
    return data;
  },

  async signIn(email: string, password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  onAuthStateChange(callback: Parameters<ReturnType<typeof createClient>["auth"]["onAuthStateChange"]>[0]) {
    const supabase = createClient();
    return supabase.auth.onAuthStateChange(callback);
  },
};
