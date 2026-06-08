import type { Review } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";

const MEDIA_LABELS: Record<string, string> = {
  film: "Film", serie: "Serie", libro: "Libro", musica: "Musica", gioco: "Gioco",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ora";
  if (mins < 60) return `${mins}m fa`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h fa`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}g fa`;
  return new Date(dateStr).toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
}

export function ReviewCard({ review }: { review: Review }) {
  const profile = review.profile;
  return (
    <article className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-4 hover:border-[#2a2a2a] transition-all">
      <div className="flex gap-3">
        {review.media_cover && (
          <img
            src={review.media_cover} alt={review.media_title}
            className="w-12 h-16 object-cover rounded-lg shrink-0"
            loading="lazy"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <span className="text-white text-sm font-medium leading-tight block truncate">{review.media_title}</span>
              <span className="text-[#555] text-xs">{MEDIA_LABELS[review.media_type] ?? review.media_type}</span>
            </div>
            <StarRating value={review.rating} size={12} />
          </div>
          {review.body && (
            <p className="text-[#aaa] text-sm leading-relaxed mt-2 line-clamp-3">{review.body}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <Avatar src={profile?.avatar_url} name={profile?.display_name ?? profile?.username} size={20} />
            <span className="text-[#555] text-xs">
              <a href={`/profile/${profile?.username}`} className="text-[#888] hover:text-[#c8a97e] transition-colors">
                @{profile?.username ?? "utente"}
              </a>
              {" · "}{timeAgo(review.created_at)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
