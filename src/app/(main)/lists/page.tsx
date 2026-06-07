import { AppShell } from "@/components/layout";
import { Panel, SectionHeader } from "@/components/ui";
import { MOCK_LISTS } from "@/lib/mock-data";
import Link from "next/link";

const LIST_TAGS = ["Tutte", "Film", "Serie", "Libri", "Musica", "Anime", "Personali"];

export default function ListsPage() {
  const featured = MOCK_LISTS[0];
  const rest = MOCK_LISTS.slice(1);

  return (
    <AppShell>
      {/* Header */}
      <div style={{ marginTop: 24, marginBottom: 28 }}>
        <div className="eyebrow">📚 Collezioni curate</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 10 }}>
          <div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 1, margin: "0 0 6px" }}>Liste</h1>
            <p style={{ color: "var(--muted)", margin: 0 }}>Collezioni create dalla community — ordinate per preferenza, tema o umore</p>
          </div>
          <button className="pill-button primary">+ Crea lista</button>
        </div>
      </div>

      {/* Filtri */}
      <div className="filters" style={{ marginBottom: 24 }}>
        {LIST_TAGS.map((tag, i) => (
          <button key={tag} className={`filter${i === 0 ? " active" : ""}`}>{tag}</button>
        ))}
      </div>

      {/* Lista in evidenza */}
      <div style={{ marginBottom: 24 }}>
        <div className="panel" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          borderRadius: 16,
          overflow: "hidden",
          minHeight: 260
        }}>
          {/* Copertine collage */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {featured.coverImages.map((src, i) => (
              <div key={i} style={{ aspectRatio: "1", overflow: "hidden" }}>
                <img src={src} alt="" width={300} height={300} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8) saturate(0.9)" }} />
              </div>
            ))}
          </div>
          {/* Info */}
          <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12, padding: "5px 10px", borderRadius: 999, background: "rgba(216,180,108,0.1)", border: "1px solid rgba(216,180,108,0.25)", fontSize: 12, color: "#ead4a4", fontWeight: 700 }}>⭐ Lista in evidenza</div>
              <h2 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 10px", lineHeight: 1.2 }}>{featured.title}</h2>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55, margin: "0 0 16px" }}>{featured.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {featured.tags.map(t => <span key={t} className="chip">#{t}</span>)}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="tiny-avatar"><img src={featured.author.avatar} alt={featured.author.name} width={34} height={34} /></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{featured.author.name}</div>
                  <div style={{ color: "var(--muted)", fontSize: 12 }}>{featured.itemCount} titoli · ♥ {featured.likes}</div>
                </div>
              </div>
              <button className="pill-button primary">Vedi lista</button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid liste */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {rest.map((list) => (
          <div key={list.id} className="panel" style={{ borderRadius: 14, overflow: "hidden" }}>
            {/* Cover strip */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(list.coverImages.length, 4)}, 1fr)`, height: 100, gap: 2 }}>
              {list.coverImages.slice(0, 4).map((src, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <img src={src} alt="" width={200} height={100} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75) saturate(0.85)" }} />
                </div>
              ))}
            </div>
            {/* Info */}
            <div style={{ padding: "14px 16px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px", lineHeight: 1.2 }}>{list.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 12px", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{list.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                {list.tags.map(t => <span key={t} className="chip" style={{ fontSize: 11, minHeight: 24 }}>#{t}</span>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div className="tiny-avatar" style={{ width: 28, height: 28 }}><img src={list.author.avatar} alt={list.author.name} width={28} height={28} /></div>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{list.author.name}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{list.itemCount} titoli · ♥ {list.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
