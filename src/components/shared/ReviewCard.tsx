import type { ReviewItem } from "@/lib/mock-data";
import { StarRating } from "./StarRating";

type ReviewCardProps = {
  review: ReviewItem;
  variant?: "feed" | "compact";
};

export function ReviewCard({ review, variant = "feed" }: ReviewCardProps) {
  if (variant === "compact") {
    return (
      <div className="feed-card" style={{ padding: "12px 14px" }}>
        <div className="poster" style={{ width: 80, height: 120, flexShrink: 0 }}>
          <img src={review.media.cover} alt={review.media.title} width={80} height={120} loading="lazy" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="person">
            <div className="tiny-avatar"><img src={review.user.avatar} alt={review.user.name} width={34} height={34} /></div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{review.user.name}</span>
            <span style={{ color: "var(--muted)", fontSize: 13 }}>{review.date}</span>
          </div>
          <div style={{ margin: "8px 0 4px" }}>
            <StarRating value={review.rating} size="sm" />
            <span style={{ marginLeft: 8, fontWeight: 700, fontSize: 15 }}>{review.media.title}</span>
          </div>
          <p className="review-text" style={{ fontSize: 14, WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>{review.text}</p>
        </div>
      </div>
    );
  }

  return (
    <article className="feed-card">
      <div className="poster">
        <img src={review.media.cover} alt={review.media.title} width={116} height={168} loading="lazy" />
      </div>
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="person">
          <div className="tiny-avatar">
            <img src={review.user.avatar} alt={review.user.name} width={34} height={34} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{review.user.name}</div>
            <div style={{ color: "var(--muted)", fontSize: 12 }}>@{review.user.username} · {review.date}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <StarRating value={review.rating} size="sm" />
          </div>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {review.media.type}
        </div>
        <p className="review-title" style={{ margin: 0, fontSize: 17, fontWeight: 820 }}>{review.media.title}</p>
        <p className="review-text">{review.text}</p>
        <div className="reaction-row">
          {review.tags.map((t) => (
            <span className="chip" key={t}>#{t}</span>
          ))}
          <span className="chip" style={{ marginLeft: "auto", color: "var(--muted)" }}>♥ {review.likes}</span>
        </div>
      </div>
    </article>
  );
}
