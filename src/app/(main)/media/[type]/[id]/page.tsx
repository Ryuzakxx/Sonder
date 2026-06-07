import { notFound } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout";
import { getMovieDetail, getTVDetail, type MediaDetail } from "@/services/tmdb";
import { getBookDetail, type BookDetail } from "@/services/books";

type PageProps = { params: Promise<{ type: string; id: string }> };

// ── utils ─────────────────────────────────────────────────────────────────────

function formatRuntime(min: number | null): string {
  if (!min) return "—";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function ratingColor(r: number): string {
  if (r >= 7.5) return "#a3d977";
  if (r >= 6)   return "#ead4a4";
  return "#d163a7";
}

// ── componenti interni ──────────────────────────────────────────────────────

function GenrePill({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.16)",
      fontSize: 12,
      fontWeight: 700,
      color: "rgba(255,255,255,0.82)",
      letterSpacing: "0.3px",
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(4px)",
    }}>
      {label}
    </span>
  );
}

function MetaRow({ label, value }: { label: string; value: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      fontSize: 14, paddingBlock: 9,
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}>
      <span style={{ color: "var(--muted)", fontWeight: 500 }}>{label}</span>
      <span style={{ fontWeight: 700, textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

function SimilarCard({ item }: { item: { id: string; title: string; year: string; cover: string | null; type: string } }) {
  const rawId = item.id.replace(/^(tmdb|book)-/, "");
  return (
    <Link href={`/media/${item.type}/${rawId}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{ display: "grid", gap: 6, cursor: "pointer" }}>
        <div style={{
          aspectRatio: "2/3", borderRadius: 8, overflow: "hidden",
          background: "#1a1c24",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: "border-color 0.15s, transform 0.15s",
        }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "rgba(255,255,255,0.22)";
            el.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "rgba(255,255,255,0.08)";
            el.style.transform = "scale(1)";
          }}
        >
          {item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              width={160}
              height={240}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", fontSize: 28, color: "var(--faint)" }}>?</div>
          )}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {item.title}
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)" }}>{item.year}</div>
      </div>
    </Link>
  );
}

// ── render film / serie ───────────────────────────────────────────────────────

function TMDBPage({ data }: { data: MediaDetail }) {
  const typeLabel = data.type === "film" ? "Film" : "Serie TV";

  return (
    <AppShell>
      {/* ── Hero ── */}
      <div className="media-hero" style={{ marginTop: 20 }}>
        {/* backdrop */}
        {data.backdrop && (
          <img
            className="media-backdrop"
            src={data.backdrop}
            alt=""
            aria-hidden="true"
            width={1280}
            height={520}
            loading="eager"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(7,8,10,0.97) 0%, rgba(7,8,10,0.6) 55%, rgba(7,8,10,0.2) 100%), linear-gradient(0deg, rgba(7,8,10,1) 0%, transparent 55%)",
        }} />

        <div className="media-inner">
          {/* poster */}
          <div className="media-poster">
            {data.poster ? (
              <img src={data.poster} alt={data.title} width={210} height={315} loading="eager"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", fontSize: 40, color: "var(--faint)", borderRadius: 10, background: "#1a1c24" }}>?</div>
            )}
          </div>

          {/* copy */}
          <div className="media-copy" style={{ position: "relative", zIndex: 1 }}>
            {/* eyebrow */}
            <div className="eyebrow" style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 8 }}>
              <span>{typeLabel}</span>
              <span style={{ color: "var(--faint)" }}>·</span>
              <span>{data.year}</span>
              {data.runtime && (
                <><span style={{ color: "var(--faint)" }}>·</span><span>{formatRuntime(data.runtime)}</span></>
              )}
              {data.language && (
                <><span style={{ color: "var(--faint)" }}>·</span><span>{data.language}</span></>
              )}
            </div>

            {/* titolo */}
            <h1 style={{ fontSize: "clamp(28px, 4vw, 54px)", lineHeight: 1.05, margin: "0 0 6px", fontWeight: 900 }}>
              {data.title}
            </h1>

            {/* titolo originale */}
            {data.originalTitle !== data.title && (
              <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 10, fontStyle: "italic" }}>
                Titolo originale: {data.originalTitle}
              </div>
            )}

            {/* tagline */}
            {data.tagline && (
              <div style={{ fontSize: 15, color: "var(--faint)", marginBottom: 14, fontStyle: "italic" }}>
                &ldquo;{data.tagline}&rdquo;
              </div>
            )}

            {/* rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{
                fontSize: 28, fontWeight: 900,
                color: ratingColor(data.rating),
                lineHeight: 1,
              }}>
                {data.rating.toFixed(1)}
              </span>
              <div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>su 10 · TMDB</div>
                <div style={{ fontSize: 12, color: "var(--faint)" }}>{data.voteCount.toLocaleString()} voti</div>
              </div>
            </div>

            {/* generi */}
            {data.genres.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                {data.genres.map((g) => <GenrePill key={g} label={g} />)}
              </div>
            )}

            {/* azioni */}
            <div className="media-actions">
              <button className="pill-button primary">+ Aggiungi al log</button>
              <button className="pill-button ghost">♡ Salva</button>
              <button className="pill-button ghost">📋 Lista</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Corpo ── */}
      <div className="main-grid" style={{ marginTop: 28 }}>
        <div className="content-stack">

          {/* Sinossi */}
          {data.overview && (
            <section style={{
              padding: "22px 24px",
              background: "var(--surface)",
              borderRadius: 14,
              border: "1px solid var(--line)",
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 760, textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)", marginBottom: 12 }}>Trama</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text)", margin: 0, maxWidth: "none" }}>{data.overview}</p>
            </section>
          )}

          {/* Cast */}
          {data.cast.length > 0 && (
            <section style={{
              padding: "22px 24px",
              background: "var(--surface)",
              borderRadius: 14,
              border: "1px solid var(--line)",
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 760, textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)", marginBottom: 16 }}>Cast principale</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))", gap: 14 }}>
                {data.cast.map((c) => (
                  <div key={c.id} style={{ display: "grid", gap: 6, textAlign: "center" }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: "50%",
                      margin: "0 auto", overflow: "hidden",
                      background: "#1a1c24",
                      border: "2px solid rgba(255,255,255,0.08)",
                    }}>
                      {c.photo ? (
                        <img src={c.photo} alt={c.name} width={64} height={64} loading="lazy"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", fontSize: 22, color: "var(--faint)" }}>👤</div>
                      )}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.2 }}>{c.character}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Correlati */}
          {data.similar.length > 0 && (
            <section style={{
              padding: "22px 24px",
              background: "var(--surface)",
              borderRadius: 14,
              border: "1px solid var(--line)",
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 760, textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)", marginBottom: 16 }}>
                Titoli simili
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 14 }}>
                {data.similar.map((m) => <SimilarCard key={m.id} item={m} />)}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar scheda tecnica */}
        <aside className="sidebar-stack">
          <div style={{
            padding: "18px 20px",
            background: "var(--surface)",
            borderRadius: 14,
            border: "1px solid var(--line)",
          }}>
            <h2 style={{ fontSize: 13, fontWeight: 760, textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)", marginBottom: 12 }}>Scheda tecnica</h2>
            <MetaRow label="Tipo" value={typeLabel} />
            <MetaRow label="Anno" value={data.year} />
            <MetaRow label="Lingua originale" value={data.language} />
            <MetaRow label="Durata" value={formatRuntime(data.runtime)} />
            {data.director && <MetaRow label={data.type === "film" ? "Regia" : "Creatore"} value={data.director} />}
            {data.seasons != null && <MetaRow label="Stagioni" value={data.seasons} />}
            {data.episodes != null && <MetaRow label="Episodi totali" value={data.episodes} />}
            {data.network && <MetaRow label="Network" value={data.network} />}
            <MetaRow label="Stato" value={data.status} />
            <MetaRow label="Voto TMDB" value={`${data.rating.toFixed(1)} / 10`} />
            <MetaRow label="Voti totali" value={data.voteCount.toLocaleString()} />
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

// ── render libro ─────────────────────────────────────────────────────────────

function BookPage({ data }: { data: BookDetail }) {
  return (
    <AppShell>
      {/* Hero libro: sfondo dal colore della cover + gradiente */}
      <div className="media-hero" style={{ marginTop: 20, background: "#0d0f14" }}>
        {/* No backdrop per i libri: usiamo un pattern sottile */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(138,168,255,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(0deg, rgba(7,8,10,1) 0%, transparent 60%)",
        }} />

        <div className="media-inner">
          {/* cover */}
          <div className="media-poster">
            {data.cover ? (
              <img src={data.cover} alt={data.title} width={210} height={315} loading="eager"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", fontSize: 40, color: "var(--faint)", borderRadius: 10, background: "#1a1c24" }}>📚</div>
            )}
          </div>

          {/* copy */}
          <div className="media-copy" style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow" style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 8 }}>
              <span>Libro</span>
              {data.year && <><span style={{ color: "var(--faint)" }}>·</span><span>{data.year}</span></>}
              {data.language && <><span style={{ color: "var(--faint)" }}>·</span><span>{data.language}</span></>}
            </div>

            <h1 style={{ fontSize: "clamp(28px, 4vw, 54px)", lineHeight: 1.05, margin: "0 0 8px", fontWeight: 900 }}>
              {data.title}
            </h1>

            {data.authors.length > 0 && (
              <div style={{ fontSize: 16, color: "#bac7ff", marginBottom: 12, fontWeight: 600 }}>
                {data.authors.join(", ")}
              </div>
            )}

            {data.rating > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: ratingColor(data.rating * 2), lineHeight: 1 }}>
                  {data.rating.toFixed(1)}
                </span>
                <div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>su 5 · Google Books</div>
                  {data.ratingCount > 0 && <div style={{ fontSize: 12, color: "var(--faint)" }}>{data.ratingCount.toLocaleString()} valutazioni</div>}
                </div>
              </div>
            )}

            {data.genres.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                {data.genres.map((g) => <GenrePill key={g} label={g} />)}
              </div>
            )}

            <div className="media-actions">
              <button className="pill-button primary">+ Aggiungi al log</button>
              <button className="pill-button ghost">♡ Salva</button>
              <button className="pill-button ghost">📋 Lista</button>
            </div>
          </div>
        </div>
      </div>

      {/* Corpo */}
      <div className="main-grid" style={{ marginTop: 28 }}>
        <div className="content-stack">
          {data.description && (
            <section style={{
              padding: "22px 24px",
              background: "var(--surface)",
              borderRadius: 14,
              border: "1px solid var(--line)",
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 760, textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)", marginBottom: 12 }}>Descrizione</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text)", margin: 0, maxWidth: "none" }}>{data.description}</p>
            </section>
          )}

          {data.similar.length > 0 && (
            <section style={{
              padding: "22px 24px",
              background: "var(--surface)",
              borderRadius: 14,
              border: "1px solid var(--line)",
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 760, textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)", marginBottom: 16 }}>Potrebbe interessarti</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 14 }}>
                {data.similar.map((m) => <SimilarCard key={m.id} item={m} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="sidebar-stack">
          <div style={{
            padding: "18px 20px",
            background: "var(--surface)",
            borderRadius: 14,
            border: "1px solid var(--line)",
          }}>
            <h2 style={{ fontSize: 13, fontWeight: 760, textTransform: "uppercase", letterSpacing: "1px", color: "var(--muted)", marginBottom: 12 }}>Scheda</h2>
            <MetaRow label="Autore/i" value={data.authors.join(", ") || null} />
            <MetaRow label="Editore" value={data.publisher || null} />
            <MetaRow label="Pubblicazione" value={data.publishedDate || null} />
            <MetaRow label="Pagine" value={data.pageCount} />
            <MetaRow label="Lingua" value={data.language} />
            <MetaRow label="ISBN" value={data.isbn} />
            {data.rating > 0 && <MetaRow label="Voto medio" value={`${data.rating.toFixed(1)} / 5`} />}
            {data.ratingCount > 0 && <MetaRow label="Valutazioni" value={data.ratingCount.toLocaleString()} />}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default async function MediaPage({ params }: PageProps) {
  const { type, id } = await params;
  const tmdbKey  = process.env.TMDB_API_KEY ?? "";
  const booksKey = process.env.GOOGLE_BOOKS_API_KEY;

  try {
    if (type === "film") {
      if (!tmdbKey) notFound();
      const data = await getMovieDetail(id, tmdbKey);
      return <TMDBPage data={data} />;
    }
    if (type === "serie") {
      if (!tmdbKey) notFound();
      const data = await getTVDetail(id, tmdbKey);
      return <TMDBPage data={data} />;
    }
    if (type === "libro") {
      const data = await getBookDetail(id, booksKey);
      return <BookPage data={data} />;
    }
  } catch {
    notFound();
  }

  notFound();
}
