import { AppShell } from "@/components/layout";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { ActivityItem } from "@/components/shared/ActivityItem";
import { MediaCard } from "@/components/shared/MediaCard";
import { Panel, SectionHeader } from "@/components/ui";
import { MOCK_REVIEWS, MOCK_ACTIVITY, MOCK_MEDIA } from "@/lib/mock-data";

export default function FeedPage() {
  const trending = MOCK_MEDIA.slice(0, 4);

  return (
    <AppShell>
      {/* Feed header */}
      <div style={{ marginTop: 24, marginBottom: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="eyebrow">🌐 Attività globale</div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 1, margin: "10px 0 6px" }}>Feed</h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: 15 }}>Cosa stanno guardando, leggendo e ascoltando le persone che segui</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="filter active">Tutti</button>
          <button className="filter">Recensioni</button>
          <button className="filter">Completati</button>
          <button className="filter">Liste</button>
        </div>
      </div>

      <div className="main-grid">
        {/* Colonna sinistra: recensioni */}
        <div className="content-stack">
          <Panel>
            <SectionHeader title="Recensioni recenti" subtitle={`${MOCK_REVIEWS.length} nuove oggi`} />
            <div className="feed-list">
              {MOCK_REVIEWS.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </Panel>

          {/* Media completati */}
          <Panel>
            <SectionHeader title="Media completati" subtitle="Dai tuoi following" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 14, padding: 14 }}>
              {trending.map((item) => (
                <MediaCard key={item.id} item={item} variant="grid" />
              ))}
            </div>
          </Panel>
        </div>

        {/* Sidebar destra: attività + trending */}
        <aside className="sidebar-stack">
          <Panel>
            <SectionHeader title="Attività in tempo reale" />
            <div className="timeline">
              {MOCK_ACTIVITY.map((item) => (
                <ActivityItem key={item.id} item={item} />
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionHeader title="In tendenza ora" />
            <div className="results" style={{ paddingTop: 8 }}>
              {MOCK_MEDIA.slice(4).map((item) => (
                <MediaCard key={item.id} item={item} variant="list" />
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}
