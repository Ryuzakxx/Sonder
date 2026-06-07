import { AppShell } from "@/components/layout";
import { ProfileClient } from "@/features/profile";
import { MOCK_PROFILE, PROFILE_LOG, PROFILE_TIMELINE } from "@/lib/mock-data";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  // In futuro: fetch dati reali per username da DB
  void username;

  return (
    <AppShell>
      <ProfileClient
        profile={MOCK_PROFILE}
        log={PROFILE_LOG}
        timeline={PROFILE_TIMELINE}
      />
    </AppShell>
  );
}
