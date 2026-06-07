import Link from "next/link";
import type { MediaItem } from "@/lib/mock-data";
import { StarRating } from "./StarRating";

type MediaCardProps = {
  item: MediaItem;
  variant?: "grid" | "list";
};

export function MediaCard({ item, variant = "grid" }: MediaCardProps) {
  const href = `/media/${item.type}/${item.id}`;

  if (variant === "list") {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        <div className="result-card" style={{ transition: "background 0.15s" }}>
          <div className="result-art">
            <img src={item.cover} alt={item.title} width={58} height={58} loading="lazy" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
            <div style={{ color: "var(--muted)", fontSize: 12 }}>{item.type} · {item.year} · {item.genre}</div>
            <div style={{ marginTop: 4 }}><StarRating value={item.score} size="sm" /></div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="poster" style={{ aspectRatio: "2/3", borderRadius: 10, overflow: "hidden" }}>
          <img src={item.cover} alt={item.title} width={200} height={300} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
          <div style={{ color: "var(--muted)", fontSize: 12 }}>{item.year} · {item.genre}</div>
          <div style={{ marginTop: 3 }}><StarRating value={item.score} size="sm" /></div>
        </div>
      </div>
    </Link>
  );
}
