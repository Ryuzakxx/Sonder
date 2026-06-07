"use client";
import { useRef } from "react";
import Link from "next/link";
import { useSearch } from "@/hooks/useSearch";
import type { SearchResult, SearchCategory } from "@/services/search";

// ─── costanti ────────────────────────────────────────────────────────────────

const CATEGORIES: { id: SearchCategory; label: string }[] = [
  { id: "tutto",  label: "Tutto" },
  { id: "film",   label: "Film" },
  { id: "serie",  label: "Serie TV" },
  { id: "libri",  label: "Libri" },
];

const TRENDING_QUERIES = [
  "Hayao Miyazaki", "Cormac McCarthy", "A24", "Dario Argento",
  "Clarice Lispector", "Shogun", "Mitski", "Villeneuve",
];

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  film:  "Film",
  serie: "Serie TV",
  libro: "Libro",
};

const TYPE_COLOR: Record<SearchResult["type"], string> = {
  film:  "rgba(216,180,108,0.18)",
  serie: "rgba(142,215,192,0.18)",
  libro: "rgba(138,168,255,0.18)",
};

const TYPE_TEXT: Record<SearchResult["type"], string> = {
  film:  "#ead4a4",
  serie: "#b0ecd8",
  libro: "#bac7ff",
};

// ─── skeleton ────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "72px 1fr",
      gap: 12,
      padding: 12,
      borderRadius: 10,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid var(--line)",
      animation: "sonder-shimmer 1.4s ease-in-out infinite",
    }}>
      <div style={{ width: 72, aspectRatio: "2/3", borderRadius: 7, background: "rgba(255,255,255,0.08)" }} />
      <div style={{ display: "grid", gap: 8, alignContent: "start", paddingTop: 4 }}>
        <div style={{ height: 14, width: "70%",  borderRadius: 999, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ height: 11, width: "40%",  borderRadius: 999, background: "rgba(255,255,255,0.07)" }} />
        <div style={{ height: 11, width: "55%",  borderRadius: 999, background: "rgba(255,255,255,0.07)" }} />
      </div>
    </div>
  );
}

// ─── singola card risultato ───────────────────────────────────────────────────

function ResultCard({ item }: { item: SearchResult }) {
  const href = `/media/${item.type}/${item.id.replace(/^(tmdb|book)-/, "")}`;
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "72px 1fr",
          gap: 12,
          padding: 12,
          borderRadius: 10,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid var(--line)",
          transition: "background 0.15s, border-color 0.15s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.16)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--line)";
        }}
      >
        {/* poster */}
        <div style={{
          width: 72, aspectRatio: "2/3",
          borderRadius: 7,
          overflow: "hidden",
          background: "#1a1c24",
          flexShrink: 0,
        }}>
          {item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              width={72}
              height={108}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "grid", placeItems: "center",
              fontSize: 22, color: "var(--faint)",
            }}>📄</div>
          )}
        </div>

        {/* info */}
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 5, paddingTop: 2 }}>
          <div style={{
            display: "inline-flex", alignSelf: "flex-start",
            padding: "2px 8px", borderRadius: 999,
            background: TYPE_COLOR[item.type],
            color: TYPE_TEXT[item.type],
            fontSize: 11, fontWeight: 700, letterSpacing: "0.4px",
          }}>
            {TYPE_LABEL[item.type]}
          </div>
          <div style={{
            fontWeight: 780, fontSize: 14, lineHeight: 1.25,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            color: "var(--text)",
          }}>
            {item.title}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            {item.year}
            {item.rating > 0 && (
              <span style={{ marginLeft: 8, color: "var(--gold)", fontWeight: 700 }}>
                ★ {item.rating.toFixed(1)}
              </span>
            )}
          </div>
          {item.overview && (
            <p style={{
              margin: 0, fontSize: 12, color: "var(--faint)", lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {item.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── sezione categoria ────────────────────────────────────────────────────────

function CategorySection({
  title, items, isLoading,
}: {
  title: string;
  items: SearchResult[];
  isLoading: boolean;
}) {
  if (!isLoading && items.length === 0) return null;
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{
        fontSize: 11, fontWeight: 760, textTransform: "uppercase",
        letterSpacing: "1px", color: "var(--muted)",
        paddingBottom: 4, borderBottom: "1px solid var(--line)",
      }}>
        {title}
      </div>
      {isLoading
        ? Array.from({ length: 3 }, (_, i) => <SkeletonCard key={i} />)
        : items.map((item) => <ResultCard key={item.id} item={item} />)
      }
    </div>
  );
}

// ─── componente principale ────────────────────────────────────────────────────

export function SearchInterface() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query, setQuery,
    category, setCategory,
    results, isLoading, error, isEmpty, hasQuery,
  } = useSearch();

  const showFilm  = category === "tutto" || category === "film";
  const showSerie = category === "tutto" || category === "serie";
  const showLibri = category === "tutto" || category === "libri";

  return (
    <>
      {/* keyframe shimmer — iniettato inline una sola volta */}
      <style>{`
        @keyframes sonder-shimmer {
          0%   { opacity: 1; }
          50%  { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* ── Hero ricerca ── */}
      <div style={{
        marginTop: 24, marginBottom: 28,
        textAlign: "center",
        maxWidth: 680, margin: "24px auto 28px",
      }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 54px)",
          fontWeight: 900, lineHeight: 1, marginBottom: 8,
        }}>
          Cerca in Sonder
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: 22, fontSize: 15 }}>
          Film, serie TV e libri — dati reali da TMDB e Google Books
        </p>

        {/* Input */}
        <div
          className="search-box"
          style={{
            maxWidth: 580, margin: "0 auto",
            padding: "14px 18px", gap: 12,
            borderColor: hasQuery ? "rgba(255,255,255,0.2)" : undefined,
            transition: "border-color 0.2s",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {isLoading ? (
            <span style={{ fontSize: 18, opacity: 0.6, animation: "sonder-shimmer 0.8s ease-in-out infinite" }}>⏳</span>
          ) : (
            <span style={{ color: "var(--faint)", fontSize: 20 }}>🔍</span>
          )}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Es. Dune, Haruki Murakami, Breaking Bad…"
            aria-label="Cerca contenuti"
            style={{ fontSize: 16, width: "100%" }}
            autoFocus
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              aria-label="Cancella ricerca"
              style={{
                background: "none", border: "none",
                color: "var(--faint)", fontSize: 18,
                cursor: "pointer", padding: 0, lineHeight: 1,
              }}
            >✕</button>
          )}
        </div>
      </div>

      {/* ── Filtri categoria ── */}
      <div className="filters" style={{ justifyContent: "center", marginBottom: 28 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`filter${category === cat.id ? " active" : ""}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Layout principale ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: 24,
        alignItems: "start",
      }}>
        {/* Colonna risultati */}
        <div style={{ display: "grid", gap: 24 }}>

          {/* Stato vuoto iniziale */}
          {!hasQuery && !isLoading && (
            <div style={{
              padding: "48px 24px",
              textAlign: "center",
              border: "1px dashed var(--line)",
              borderRadius: 14,
              color: "var(--muted)",
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Inizia a cercare</div>
              <div style={{ fontSize: 14 }}>Digita almeno 2 caratteri per trovare film, serie e libri</div>
            </div>
          )}

          {/* Empty state dopo ricerca */}
          {isEmpty && (
            <div style={{
              padding: "48px 24px",
              textAlign: "center",
              border: "1px dashed var(--line)",
              borderRadius: 14,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔭</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: "var(--text)" }}>
                Nessun risultato per &ldquo;{query}&rdquo;
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>Prova con un termine diverso o cambia categoria</div>
            </div>
          )}

          {/* Errore */}
          {error && (
            <div style={{
              padding: "20px 24px",
              borderRadius: 12,
              background: "rgba(161,44,123,0.1)",
              border: "1px solid rgba(161,44,123,0.25)",
              color: "#d163a7",
              fontSize: 14,
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Risultati per categoria */}
          {(hasQuery || isLoading) && (
            <>
              {showFilm && (
                <CategorySection
                  title="Film"
                  items={results.film}
                  isLoading={isLoading}
                />
              )}
              {showSerie && (
                <CategorySection
                  title="Serie TV"
                  items={results.serie}
                  isLoading={isLoading}
                />
              )}
              {showLibri && (
                <CategorySection
                  title="Libri"
                  items={results.libri}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside style={{ display: "grid", gap: 16, position: "sticky", top: 92 }}>
          {/* Ricerche di tendenza */}
          <div className="panel" style={{ borderRadius: 14, overflow: "hidden" }}>
            <div className="section-title">
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 760 }}>Ricerche popolari</h2>
            </div>
            <div style={{ padding: "10px 14px 14px", display: "flex", flexWrap: "wrap", gap: 7 }}>
              {TRENDING_QUERIES.map((q) => (
                <button
                  key={q}
                  className="chip"
                  onClick={() => setQuery(q)}
                  style={{ cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(216,180,108,0.14)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(216,180,108,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#ead4a4";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "";
                    (e.currentTarget as HTMLButtonElement).style.color = "";
                  }}
                >
                  🔥 {q}
                </button>
              ))}
            </div>
          </div>

          {/* Fonte dati */}
          <div className="panel" style={{ borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Fonti dati</div>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { icon: "🎬", label: "TMDB", desc: "Film e serie TV", color: "#01b4e4" },
                { icon: "📚", label: "Google Books", desc: "Libri e romanzi", color: "#4285f4" },
              ].map((src) => (
                <div key={src.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{src.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: src.color }}>{src.label}</div>
                    <div style={{ fontSize: 12, color: "var(--faint)" }}>{src.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggerimento API key */}
          <div className="panel" style={{ borderRadius: 14, padding: "14px 16px", background: "rgba(216,180,108,0.05)", border: "1px solid rgba(216,180,108,0.15)" }}>
            <div style={{ fontSize: 12, color: "#ead4a4", fontWeight: 700, marginBottom: 6 }}>⚙️ Configurazione</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
              Aggiungi <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4, fontSize: 11 }}>TMDB_API_KEY</code> e <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4, fontSize: 11 }}>GOOGLE_BOOKS_API_KEY</code> nel tuo <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4, fontSize: 11 }}>.env.local</code>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
