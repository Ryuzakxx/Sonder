import { AppShell } from "@/components/layout";
import { MediaCard } from "@/components/shared/MediaCard";
import { Panel, SectionHeader } from "@/components/ui";
import { MOCK_MEDIA } from "@/lib/mock-data";

const CATEGORIES = ["Tutto", "Film", "Serie", "Libri", "Musica", "Persone", "Liste"];

const TRENDING_QUERIES = [
  "Hayao Miyazaki", "Cormac McCarthy", "A24", "Dario Argento",
  "Clarice Lispector", "Shogun 2024", "Mitski", "Villeneuve"
];

export default function SearchPage() {
  return (
    <AppShell>
      {/* Search hero */}
      <div style={{ marginTop: 24, marginBottom: 28, textAlign: "center", maxWidth: 680, margin: "24px auto 32px" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>Cerca in Sonder</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 16 }}>Film, serie, libri, musica, profili e liste</p>
        <div className="search-box" style={{ maxWidth: 560, margin: "0 auto", fontSize: 17, padding: "16px 20px" }}>
          <span style={{ color: "var(--faint)", fontSize: 20 }}>🔍</span>
          <input type="search" placeholder="Es. Past Lives, Haruki Murakami, indie horror..." aria-label="Cerca contenuti" style={{ fontSize: 16 }} />
        </div>
      </div>

      {/* Filtri categoria */}
      <div className="filters" style={{ justifyContent: "center", marginBottom: 8 }}>
        {CATEGORIES.map((cat, i) => (
          <button key={cat} className={`filter${i === 0 ? " active" : ""}`}>{cat}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 22, marginTop: 24, alignItems: "start" }}>
        {/* Risultati principali */}
        <div style={{ display: "grid", gap: 20 }}>
          <Panel>
            <SectionHeader title="Film & Serie" subtitle="Più cercati questa settimana" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16, padding: 16 }}>
              {MOCK_MEDIA.filter(m => m.type === "film" || m.type === "serie").map((item) => (
                <MediaCard key={item.id} item={item} variant="grid" />
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionHeader title="Libri & Musica" subtitle="Scopri nuovi artisti e autori" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16, padding: 16 }}>
              {MOCK_MEDIA.filter(m => m.type === "libro" || m.type === "musica").map((item) => (
                <MediaCard key={item.id} item={item} variant="grid" />
              ))}
            </div>
          </Panel>
        </div>

        {/* Sidebar: trending searches + profili */}
        <aside style={{ display: "grid", gap: 16 }}>
          <Panel>
            <SectionHeader title="Ricerche popolari" />
            <div style={{ padding: "0 14px 14px", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TRENDING_QUERIES.map((q) => (
                <button key={q} className="chip" style={{ cursor: "pointer" }}>🔥 {q}</button>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionHeader title="Profili in evidenza" />
            <div style={{ padding: "8px 14px 14px", display: "grid", gap: 10 }}>
              {[
                { name: "Elena Russo", handle: "@elenarusso", avatar: "https://i.pravatar.cc/150?img=47", logged: 412 },
                { name: "Marco Ferri", handle: "@marcoferri", avatar: "https://i.pravatar.cc/150?img=12", logged: 387 },
                { name: "Giulia Esposito", handle: "@giuliaesposito", avatar: "https://i.pravatar.cc/150?img=25", logged: 301 }
              ].map((user) => (
                <div key={user.handle} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="tiny-avatar" style={{ width: 40, height: 40 }}>
                    <img src={user.avatar} alt={user.name} width={40} height={40} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{user.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12 }}>{user.handle} · {user.logged} loggati</div>
                  </div>
                  <button className="pill-button ghost" style={{ fontSize: 12, minHeight: 30, padding: "0 10px" }}>Segui</button>
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}
