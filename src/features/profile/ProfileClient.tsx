"use client";
import { useState } from "react";
import type { MediaType, ProfileLogItem, TimelineEvent } from "@/lib/mock-data";

// ── tipi ───────────────────────────────────────────────────────────────────────

type FilterCategory = "tutto" | "film" | "libri" | "giochi" | "serie";

type ProfileData = {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  banner: string;
  location: string;
  joinedYear: number;
  stats: {
    logged: number; reviews: number; lists: number;
    followers: number; following: number;
    film: number; serie: number; libri: number; giochi: number;
  };
  tasteFingerprint: { label: string; value: number; color: string }[];
  favorites: Record<string, { title: string; cover: string; year: number }>;
  topGenres: string[];
  compatibleUsers: { name: string; handle: string; avatar: string; compat: number }[];
};

type Props = {
  profile: ProfileData;
  log: ProfileLogItem[];
  timeline: TimelineEvent[];
};

// ── costanti ─────────────────────────────────────────────────────────────────────

const FILTERS: { id: FilterCategory; label: string; icon: string }[] = [
  { id: "tutto",  label: "Tutto",   icon: "▦" },
  { id: "film",   label: "Film",    icon: "🎬" },
  { id: "serie",  label: "Serie",   icon: "📺" },
  { id: "libri",  label: "Libri",   icon: "📚" },
  { id: "giochi", label: "Giochi",  icon: "🎮" },
];

const TYPE_COLOR: Partial<Record<MediaType, string>> = {
  film:  "#ead4a4",
  serie: "#b0ecd8",
  libro: "#bac7ff",
  gioco: "#f4a8d4",
  musica: "#c4b5fd",
};

const TYPE_BG: Partial<Record<MediaType, string>> = {
  film:  "rgba(216,180,108,0.12)",
  serie: "rgba(142,215,192,0.12)",
  libro: "rgba(138,168,255,0.12)",
  gioco: "rgba(244,168,212,0.12)",
  musica: "rgba(196,181,253,0.12)",
};

const TYPE_LABEL: Partial<Record<MediaType, string>> = {
  film: "Film", serie: "Serie", libro: "Libro", gioco: "Gioco", musica: "Musica",
};

const ACTION_ICON: Record<TimelineEvent["action"], string> = {
  "completato":       "✅",
  "recensito":        "✍️",
  "aggiunto a lista": "📋",
  "iniziato":         "▶️",
  "salvato":          "♥",
};

// ── sotto-componenti ───────────────────────────────────────────────────────────────

function Stars({ value }: { value: number }) {
  return (
    <span style={{ color: "var(--gold)", fontSize: 12, letterSpacing: 1 }}>
      {Array.from({ length: 5 }, (_, i) => i < value ? "★" : "☆").join("")}
    </span>
  );
}

function SectionShell({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section style={{
      background: "var(--surface)",
      borderRadius: 14,
      border: "1px solid var(--line)",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 18px",
        borderBottom: "1px solid var(--line)",
      }}>
        <h2 style={{ margin: 0, fontSize: 13, fontWeight: 760, textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)" }}>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function TypeBadge({ type }: { type: MediaType }) {
  return (
    <span style={{
      padding: "2px 7px", borderRadius: 999, fontSize: 11, fontWeight: 700,
      color: TYPE_COLOR[type] ?? "var(--muted)",
      background: TYPE_BG[type] ?? "rgba(255,255,255,0.06)",
    }}>
      {TYPE_LABEL[type] ?? type}
    </span>
  );
}

// ── sezione: log filtrato ────────────────────────────────────────────────────────

function LogSection({ items }: { items: ProfileLogItem[] }) {
  if (items.length === 0) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted)" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Nessun elemento in questa categoria</div>
      </div>
    );
  }
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
      gap: 12,
      padding: 16,
    }}>
      {items.map((item) => (
        <div key={item.id} style={{ display: "grid", gap: 6 }}>
          <div style={{
            aspectRatio: "2/3", borderRadius: 8, overflow: "hidden",
            background: "#1a1c24",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
          }}>
            <img
              src={item.cover} alt={item.title}
              width={90} height={135}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* badge status */}
            {item.status === "in-corso" && (
              <div style={{
                position: "absolute", bottom: 4, left: 4,
                background: "rgba(163,217,119,0.9)", color: "#0a1a06",
                fontSize: 9, fontWeight: 900, padding: "2px 5px", borderRadius: 4,
              }}>IN CORSO</div>
            )}
          </div>
          <Stars value={item.rating} />
          <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.2, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {item.title}
          </div>
          <div style={{ fontSize: 10, color: "var(--faint)" }}>{item.loggedAt}</div>
        </div>
      ))}
    </div>
  );
}

// ── sezione: timeline ──────────────────────────────────────────────────────────────

function TimelineSection({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted)" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Nessuna attività</div>
      </div>
    );
  }
  return (
    <div style={{ padding: "8px 0" }}>
      {events.map((ev, i) => (
        <div key={ev.id} style={{
          display: "grid",
          gridTemplateColumns: "48px 1fr",
          gap: 0,
          padding: "12px 18px",
          borderBottom: i < events.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}>
          {/* cover verticale + linea */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <div style={{
              width: 36, height: 54, borderRadius: 5, overflow: "hidden",
              background: "#1a1c24", flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <img src={ev.cover} alt={ev.title} width={36} height={54} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {i < events.length - 1 && (
              <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.07)", marginTop: 6 }} />
            )}
          </div>

          {/* contenuto */}
          <div style={{ paddingLeft: 12, paddingBottom: i < events.length - 1 ? 8 : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: 14 }}>{ACTION_ICON[ev.action]}</span>
              <TypeBadge type={ev.mediaType} />
              <span style={{ fontSize: 11, color: "var(--faint)" }}>{ev.date}</span>
            </div>
            <div style={{ fontWeight: 780, fontSize: 14, marginBottom: ev.excerpt ? 5 : 0 }}>
              {ev.title}
            </div>
            {ev.rating && (
              <Stars value={ev.rating} />
            )}
            {ev.excerpt && (
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted)", lineHeight: 1.5, fontStyle: "italic" }}>
                &ldquo;{ev.excerpt}&rdquo;
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── sezione: impronta culturale ──────────────────────────────────────────────────────

function TasteSection({ fingerprint }: { fingerprint: { label: string; value: number; color: string }[] }) {
  return (
    <div style={{ padding: "16px 20px 20px" }}>
      {fingerprint.map((item) => (
        <div key={item.label} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 5 }}>
            <span style={{ fontWeight: 700 }}>{item.label}</span>
            <span style={{ fontWeight: 800, color: item.color }}>{item.value}%</span>
          </div>
          <div style={{ height: 5, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${item.value}%`, borderRadius: 999,
              background: item.color,
              transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── sezione: favoriti ─────────────────────────────────────────────────────────────────

const FAV_LABELS: Record<string, { icon: string; label: string }> = {
  film:  { icon: "🎬", label: "Film preferito" },
  serie: { icon: "📺", label: "Serie preferita" },
  libro: { icon: "📚", label: "Libro preferito" },
  gioco: { icon: "🎮", label: "Gioco preferito" },
};

function FavoritesSection({ favorites }: { favorites: Record<string, { title: string; cover: string; year: number }> }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: 14,
      padding: 16,
    }}>
      {Object.entries(favorites).map(([key, fav]) => (
        <div key={key} style={{ display: "grid", gap: 6 }}>
          <div style={{
            aspectRatio: "2/3", borderRadius: 9, overflow: "hidden",
            background: "#1a1c24",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <img src={fav.cover} alt={fav.title} width={120} height={180} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            {FAV_LABELS[key]?.icon} {FAV_LABELS[key]?.label}
          </div>
          <div style={{ fontSize: 13, fontWeight: 780, lineHeight: 1.2 }}>{fav.title}</div>
          <div style={{ fontSize: 11, color: "var(--faint)" }}>{fav.year}</div>
        </div>
      ))}
    </div>
  );
}

// ── componente principale ──────────────────────────────────────────────────────

export function ProfileClient({ profile, log, timeline }: Props) {
  const [filter, setFilter] = useState<FilterCategory>("tutto");

  // mapping categoria filtro → mediaType del log
  const logTypeMap: Partial<Record<FilterCategory, MediaType[]>> = {
    film:   ["film"],
    serie:  ["serie"],
    libri:  ["libro"],
    giochi: ["gioco"],
  };

  const filteredLog = filter === "tutto"
    ? log
    : log.filter((i) => logTypeMap[filter]?.includes(i.mediaType));

  const filteredTimeline = filter === "tutto"
    ? timeline
    : timeline.filter((e) => logTypeMap[filter]?.includes(e.mediaType));

  return (
    <>
      {/* ── Header: banner + identità ── */}
      <div style={{
        position: "relative", marginTop: 20,
        borderRadius: 16, overflow: "hidden",
        border: "1px solid var(--line)",
      }}>
        {/* Banner */}
        <div style={{ height: 200, overflow: "hidden" }}>
          <img
            src={profile.banner} alt="banner"
            width={1200} height={200} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65) saturate(0.8)" }}
          />
        </div>

        {/* Identità */}
        <div style={{ background: "rgba(9,10,13,0.9)", backdropFilter: "blur(14px)", padding: "0 24px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "end", marginTop: "-48px" }}>
            {/* Avatar */}
            <div style={{
              width: 96, height: 96, borderRadius: 22, overflow: "hidden",
              border: "3px solid #0d0e12",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.12)",
              flexShrink: 0,
            }}>
              <img src={profile.avatar} alt={profile.name} width={96} height={96}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Nome + info */}
            <div style={{ paddingTop: 54 }}>
              <h1 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900, margin: "0 0 3px", lineHeight: 1 }}>
                {profile.name}
              </h1>
              <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 7 }}>
                @{profile.username} · {profile.location} · su Sonder dal {profile.joinedYear}
              </div>
              <p style={{ color: "#d4d0ca", fontSize: 14, margin: 0, lineHeight: 1.5, maxWidth: 520 }}>
                {profile.bio}
              </p>
            </div>

            {/* Azioni */}
            <div style={{ paddingTop: 54, display: "flex", gap: 8 }}>
              <button className="pill-button primary">Segui</button>
              <button className="pill-button ghost">Messaggio</button>
            </div>
          </div>

          {/* Stats per tipo */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            marginTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 16,
            gap: 0,
          }}>
            {([
              [profile.stats.logged,    "Totali"],
              [profile.stats.film,      "Film"],
              [profile.stats.serie,     "Serie"],
              [profile.stats.libri,     "Libri"],
              [profile.stats.giochi,    "Giochi"],
              [profile.stats.reviews,   "Recensioni"],
              [profile.stats.lists,     "Liste"],
              [profile.stats.followers, "Follower"],
              [profile.stats.following, "Following"],
            ] as [number, string][]).map(([val, lbl], i) => (
              <div key={lbl} style={{
                textAlign: "center",
                padding: "0 8px",
                borderRight: i < 8 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <div style={{ fontWeight: 900, fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1, color: "var(--text)" }}>
                  {val.toLocaleString()}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3, fontWeight: 600 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filtri globali ── */}
      <div className="filters" style={{ margin: "22px 0 0", justifyContent: "flex-start" }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`filter${filter === f.id ? " active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            <span style={{ marginRight: 5 }}>{f.icon}</span>{f.label}
          </button>
        ))}
      </div>

      {/* ── Griglia principale ── */}
      <div className="main-grid" style={{ marginTop: 20 }}>
        {/* Colonna principale */}
        <div className="content-stack">

          {/* Log */}
          <SectionShell
            title={`Log — ${filteredLog.length} ${filter === "tutto" ? "totali" : FILTERS.find(f => f.id === filter)?.label ?? ""}`}
          >
            <LogSection items={filteredLog} />
          </SectionShell>

          {/* Timeline attività */}
          <SectionShell title="Attività recente">
            <TimelineSection events={filteredTimeline} />
          </SectionShell>

        </div>

        {/* Sidebar */}
        <aside className="sidebar-stack">

          {/* Favoriti */}
          <SectionShell title="Favoriti di sempre">
            <FavoritesSection favorites={profile.favorites} />
          </SectionShell>

          {/* Impronta culturale */}
          <SectionShell title="Impronta culturale">
            <TasteSection fingerprint={profile.tasteFingerprint} />
          </SectionShell>

          {/* Top generi */}
          <SectionShell title="Generi dominanti">
            <div style={{ padding: "10px 16px 14px", display: "flex", flexWrap: "wrap", gap: 7 }}>
              {profile.topGenres.map((g) => (
                <span key={g} className="chip" style={{
                  background: "rgba(216,180,108,0.08)",
                  borderColor: "rgba(216,180,108,0.22)",
                  color: "#ead4a4",
                  fontSize: 12,
                }}>{g}</span>
              ))}
            </div>
          </SectionShell>

          {/* Affinità */}
          <SectionShell title="Affinità culturale">
            <div style={{ padding: "10px 16px 16px", display: "grid", gap: 12 }}>
              {profile.compatibleUsers.map((u) => (
                <div key={u.handle} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="tiny-avatar" style={{ width: 40, height: 40 }}>
                    <img src={u.avatar} alt={u.name} width={40} height={40} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12 }}>@{u.handle}</div>
                  </div>
                  <div style={{
                    width: 46, height: 46, borderRadius: "50%",
                    background: `conic-gradient(var(--mint) 0 ${u.compat}%, rgba(255,255,255,0.08) ${u.compat}% 100%)`,
                    display: "grid", placeItems: "center",
                    fontSize: 11, fontWeight: 900, color: "#111",
                    boxShadow: "inset 0 0 0 6px #12161a",
                  }}>{u.compat}%</div>
                </div>
              ))}
            </div>
          </SectionShell>

        </aside>
      </div>
    </>
  );
}
