import { AppShell } from "@/components/layout";
import { StarRating } from "@/components/shared/StarRating";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { MediaCard } from "@/components/shared/MediaCard";
import { Panel, SectionHeader } from "@/components/ui";
import { MOCK_MEDIA, MOCK_REVIEWS } from "@/lib/mock-data";
import { notFound } from "next/navigation";

type MediaPageProps = {
  params: Promise<{ type: string; id: string }>;
};

const TYPE_LABELS: Record<string, string> = {
  film: "Film",
  serie: "Serie TV",
  libro: "Libro",
  musica: "Album / Singolo"
};

const RATING_BARS = [62, 22, 9, 5, 2]; // % per 5→1 stelle

export default async function MediaPage({ params }: MediaPageProps) {
  const { type, id } = await params;
  const media = MOCK_MEDIA.find((m) => m.id === id && m.type === type);

  if (!media) notFound();

  const related = MOCK_MEDIA.filter((m) => m.type === media.type && m.id !== media.id).slice(0, 4);

  return (
    <AppShell>
      {/* Hero cinematografico */}
      <div className="media-hero" style={{ marginTop: 20 }}>
        {/* Backdrop */}
        <img
          className="media-backdrop"
          src={media.cover}
          alt=""
          aria-hidden="true"
          width={1440}
          height={520}
          loading="eager"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Overlay gradients */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(7,8,10,0.94), rgba(7,8,10,0.48) 55%, rgba(7,8,10,0.22)), linear-gradient(0deg, rgba(7,8,10,1), transparent 60%)"
        }} />

        {/* Contenuto */}
        <div className="media-inner">
          <div className="media-poster">
            <img src={media.cover} alt={media.title} width={210} height={315} loading="eager" />
          </div>
          <div className="media-copy" style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow">{TYPE_LABELS[media.type] ?? media.type} · {media.year} · {media.genre}</div>
            <h1 className="media-copy" style={{ fontSize: "clamp(34px, 4vw, 58px)", lineHeight: 1, margin: "10px 0 12px", fontWeight: 900 }}>{media.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <StarRating value={media.score} />
              <span style={{ fontWeight: 900, fontSize: 22, color: "var(--gold)" }}>{media.score}</span>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>{media.reviewCount.toLocaleString()} recensioni</span>
            </div>
            {/* Distribuzione rating */}
            <div className="distribution">
              {RATING_BARS.map((pct, i) => (
                <div key={i} className="bar" title={`${5 - i}★`}>
                  <span style={{ height: `${pct}%` }} />
                </div>
              ))}
            </div>
            <div className="media-actions" style={{ marginTop: 22 }}>
              <button className="pill-button primary">+ Aggiungi al log</button>
              <button className="pill-button ghost">♡ Salva</button>
              <button className="pill-button ghost">📋 Aggiungi a lista</button>
            </div>
          </div>
        </div>
      </div>

      {/* Corpo pagina media */}
      <div className="main-grid" style={{ marginTop: 24 }}>
        <div className="content-stack">
          {/* Recensioni per questo media */}
          <Panel>
            <SectionHeader
              title="Cosa ne pensa la community"
              subtitle={`${media.reviewCount.toLocaleString()} recensioni totali`}
            />
            <div className="feed-list">
              {MOCK_REVIEWS.slice(0, 3).map((r) => (
                <ReviewCard key={r.id} review={{ ...r, media: { title: media.title, type: TYPE_LABELS[media.type] ?? media.type, cover: media.cover } }} />
              ))}
            </div>
          </Panel>
        </div>

        <aside className="sidebar-stack">
          {/* Info scheda */}
          <Panel>
            <SectionHeader title="Scheda" />
            <div style={{ padding: "8px 16px 16px", display: "grid", gap: 10 }}>
              {[
                ["Tipo", TYPE_LABELS[media.type] ?? media.type],
                ["Anno", media.year],
                ["Genere", media.genre],
                ["Voto medio", `${media.score} / 5`],
                ["Recensioni", media.reviewCount.toLocaleString()]
              ].map(([k, v]) => (
                <div key={String(k)} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, paddingBottom: 8, borderBottom: "1px solid var(--line)" }}>
                  <span style={{ color: "var(--muted)" }}>{k}</span>
                  <span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Correlati */}
          {related.length > 0 && (
            <Panel>
              <SectionHeader title="Correlati" subtitle={`Altri ${TYPE_LABELS[media.type] ?? media.type}`} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, padding: 14 }}>
                {related.map((m) => (
                  <MediaCard key={m.id} item={m} variant="grid" />
                ))}
              </div>
            </Panel>
          )}
        </aside>
      </div>
    </AppShell>
  );
}
