"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { authService } from "@/services/auth.service";
import { profileService } from "@/services/profile.service";

export function useAuth() {
  const { user, session, profile, isLoading, setUser, setSession, setProfile, setLoading, clear } = useAuthStore();

  useEffect(() => {
    authService.getSession().then(async (sess) => {
      if (sess) {
        setSession(sess);
        setUser(sess.user);
        const p = await profileService.getById(sess.user.id);
        setProfile(p);
      }
      setLoading(false);
    });

    const { data: { subscription } } = authService.onAuthStateChange(async (event, sess) => {
      if (sess) {
        setSession(sess);
        setUser(sess.user);
        const p = await profileService.getById(sess.user.id);
        setProfile(p);
      } else {
        clear();
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  return { user, session, profile, isLoading };
}
