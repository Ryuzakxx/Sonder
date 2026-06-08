import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProfilePageClient } from "@/features/profile/ProfilePageClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username}` };
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single();
  if (!profile) notFound();

  const [{ data: reviews }, { data: activities }] = await Promise.all([
    supabase.from("reviews").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }).limit(20),
    supabase.from("activities").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }).limit(30),
  ]);

  return <ProfilePageClient profile={profile} reviews={reviews ?? []} activities={activities ?? []} />;
}
