import { AppShell } from "@/components/layout";
import { StarRating } from "@/components/shared/StarRating";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { Panel, SectionHeader } from "@/components/ui";
import { MOCK_PROFILE, MOCK_REVIEWS } from "@/lib/mock-data";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = MOCK_PROFILE;

  return (
    <AppShell>
      {/* Banner + identità */}
      <div style={{ position: "relative", marginTop: 20, borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)" }}>
        {/* Banner */}
        <div style={{ height: 200, overflow: "hidden" }}>
          <img
            src={profile.banner}
            alt="banner"
            width={1200}
            height={200}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) saturate(0.85)" }}
          />
        </div>
        {/* Identità overlay */}
        <div style={{ background: "rgba(9,10,13,0.88)", backdropFilter: "blur(12px)", padding: "0 24px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "end", marginTop: "-44px" }}>
            {/* Avatar */}
            <div style={{ width: 88, height: 88, borderRadius: 20, overflow: "hidden", border: "3px solid #111217", flexShrink: 0 }}>
              <img src={profile.avatar} alt={profile.name} width={88} height={88} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Nome + bio */}
            <div style={{ paddingTop: 48 }}>
              <h1 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, margin: "0 0 4px", lineHeight: 1 }}>{profile.name}</h1>
              <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 8 }}>@{username} · {profile.location} · dal {profile.joinedYear}</div>
              <p style={{ color: "#d4d0ca", fontSize: 15, margin: 0 }}>{profile.bio}</p>
            </div>
            {/* Azioni */}
            <div style={{ paddingTop: 48, display: "flex", gap: 8 }}>
              <button className="pill-button primary">Segui</button>
              <button className="pill-button ghost">Messaggio</button>
            </div>
          </div>

          {/* Stats rapide */}
          <div className="stats-row" style={{ marginTop: 20, gridTemplateColumns: "repeat(5, 1fr)" }}>
            {([
              [profile.stats.logged, "Loggati"],
              [profile.stats.reviews, "Recensioni"],
              [profile.stats.lists, "Liste"],
              [profile.stats.followers, "Follower"],
              [profile.stats.following, "Following"]
            ] as [number, string][]).map(([val, lbl]) => (
              <div key={lbl} className="stat">
                <strong>{val.toLocaleString()}</strong>
                <span>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corpo profilo */}
      <div className="main-grid" style={{ marginTop: 24 }}>
        <div className="content-stack">
          {/* Identità culturale — taste fingerprint */}
          <Panel>
            <SectionHeader title="Impronta culturale" subtitle="Generi dominanti nel gusto" />
            <div style={{ padding: "16px 20px 20px" }}>
              {profile.tasteFingerprint.map((item) => (
                <div key={item.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 5 }}>
                    <span style={{ fontWeight: 700 }}>{item.label}</span>
                    <span style={{ color: "var(--gold)", fontWeight: 800 }}>{item.value}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${item.value}%`,
                      borderRadius: 999,
                      background: "linear-gradient(90deg, var(--gold), #c48072)"
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Recensioni recenti */}
          <Panel>
            <SectionHeader title="Recensioni recenti" subtitle={`${profile.stats.reviews} totali`} />
            <div className="feed-list">
              {MOCK_REVIEWS.slice(0, 2).map((r) => (
                <ReviewCard key={r.id} review={{ ...r, user: { name: profile.name, username, avatar: profile.avatar } }} variant="compact" />
              ))}
            </div>
          </Panel>
        </div>

        <aside className="sidebar-stack">
          {/* Log recente */}
          <Panel>
            <SectionHeader title="Ultimi loggati" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, padding: 14 }}>
              {profile.recentMedia.map((m) => (
                <div key={m.title} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ aspectRatio: "2/3", borderRadius: 8, overflow: "hidden", background: "#191b22" }}>
                    <img src={m.cover} alt={m.title} width={120} height={180} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <StarRating value={m.rating} size="sm" max={5} />
                </div>
              ))}
            </div>
          </Panel>

          {/* Compatibilità gusto */}
          <Panel>
            <SectionHeader title="Affinità culturale" subtitle="Utenti simili al tuo gusto" />
            <div style={{ padding: "8px 14px 16px", display: "grid", gap: 12 }}>
              {profile.compatibleUsers.map((u) => (
                <div key={u.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="tiny-avatar" style={{ width: 38, height: 38 }}>
                    <img src={u.avatar} alt={u.name} width={38} height={38} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12 }}>Compatibilità gusto</div>
                  </div>
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: "50%",
                    background: `conic-gradient(var(--mint) 0 ${u.compat}%, rgba(255,255,255,0.1) ${u.compat}% 100%)`,
                    display: "grid", placeItems: "center",
                    fontSize: 12, fontWeight: 900, color: "#111",
                    boxShadow: `inset 0 0 0 6px #12161a`
                  }}>{u.compat}%</div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Generi dominanti */}
          <Panel>
            <SectionHeader title="Top generi" />
            <div style={{ padding: "8px 14px 14px", display: "flex", flexWrap: "wrap", gap: 7 }}>
              {profile.topGenres.map((g) => (
                <span key={g} className="chip" style={{ background: "rgba(216,180,108,0.1)", borderColor: "rgba(216,180,108,0.25)", color: "#ead4a4" }}>{g}</span>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}
