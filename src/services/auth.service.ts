import { supabase } from "@/lib/supabase/client";

export const authService = {
  async signUp(email: string, password: string, username?: string) {
    return supabase.auth.signUp(email, password, { username: username ?? email.split("@")[0] });
  },
  async signIn(email: string, password: string) {
    return supabase.auth.signIn(email, password);
  },
  async signOut() {
    return supabase.auth.signOut();
  },
  async getUser() {
    return supabase.auth.getUser();
  },
};
