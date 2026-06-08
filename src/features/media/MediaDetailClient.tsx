"use client";
import { useState } from "react";
import { StarRating } from "@/components/ui/StarRating";
import { useAuthStore } from "@/store/auth";
import { reviewService } from "@/services/review.service";
import { favoritesService } from "@/services/favorites.service";
import { activityService } from "@/services/activity.service";
import { tmdbService } from "@/services/tmdb.service";
import { toast } from "sonner";

interface Props {
  type: "film" | "serie" | "libro";
  data: Record<string, unknown>;
}

export function MediaDetailClient({ type, data }: Props) {
  const { user } = useAuthStore();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const title = type === "libro"
    ? (data.volumeInfo as Record<string, string>)?.title
    : (type === "film" ? data.title : data.name) as string;

  const overview = type === "libro"
    ? (data.volumeInfo as Record<string, string>)?.description
    : data.overview as string;

  const posterPath = type === "libro"
    ? ((data.volumeInfo as Record<string, { thumbnail?: string }>)?.imageLinks?.thumbnail ?? null)
    : tmdbService.posterUrl(data.poster_path as string | null);

  const backdropPath = type !== "libro"
    ? tmdbService.backdropUrl(data.backdrop_path as string | null)
    : null;

  const voteAvg = type === "libro"
    ? (data.volumeInfo as Record<string, number>)?.averageRating
    : data.vote_average as number;

  const year = type === "film"
    ? (data.release_date as string)?.slice(0, 4)
    : type === "serie"
    ? (data.first_air_date as string)?.slice(0, 4)
    : (data.volumeInfo as Record<string, string>)?.publishedDate?.slice(0, 4);

  const mediaId = String(data.id);

  async function handleReview() {
    if (!user) { toast.error("Accedi per recensire"); return; }
    if (!rating) { toast.error("Seleziona un voto"); return; }
    setSubmitting(true);
    try {
      await reviewService.create({
        userId: user.id, mediaType: type, mediaId, mediaTitle: title,
        mediaCover: posterPath ?? undefined, rating, body: reviewText || undefined,
      });
      await activityService.log({
        userId: user.id, action: "ha recensito", mediaType: type,
        mediaId, mediaTitle: title, mediaCover: posterPath ?? undefined,
      });
      toast.success("Recensione salvata!");
      setRating(0); setReviewText("");
    } catch { toast.error("Errore nel salvataggio"); }
    finally { setSubmitting(false); }
  }

  async function handleFavorite() {
    if (!user) { toast.error("Accedi per aggiungere ai preferiti"); return; }
    if (favorited) {
      await favoritesService.remove(user.id, mediaId);
      setFavorited(false); toast.success("Rimosso dai preferiti");
    } else {
      await favoritesService.add(user.id, type, mediaId, title, posterPath ?? undefined);
      setFavorited(true); toast.success("Aggiunto ai preferiti!");
    }
  }

  return (
    <div>
      {/* Backdrop */}
      {backdropPath && (
        <div className="-mx-4 -mt-6 mb-6 relative h-48 sm:h-64 overflow-hidden">
          <img src={backdropPath} alt="" className="w-full h-full object-cover opacity-40" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
        </div>
      )}

      <div className="flex gap-6">
        {posterPath && (
          <img src={posterPath} alt={title} className="w-28 sm:w-36 rounded-xl object-cover shrink-0 shadow-2xl" loading="lazy" />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{title}</h1>
          <div className="flex items-center gap-3 mt-2">
            {year && <span className="text-[#555] text-sm">{year}</span>}
            {voteAvg && (
              <span className="flex items-center gap-1 text-sm">
                <span className="text-[#c8a97e]">★</span>
                <span className="text-white">{Number(voteAvg).toFixed(1)}</span>
              </span>
            )}
            <span className="text-xs px-2 py-0.5 bg-[#1e1e1e] border border-[#2a2a2a] rounded-full text-[#888] capitalize">{type}</span>
          </div>
          {overview && <p className="text-[#888] text-sm leading-relaxed mt-3 max-w-2xl line-clamp-4">{overview}</p>}
          <button
            onClick={handleFavorite}
            className={`mt-4 px-4 py-2 rounded-lg text-sm border transition-colors ${
              favorited ? "bg-[#c8a97e]/10 border-[#c8a97e] text-[#c8a97e]" : "border-[#2a2a2a] text-[#666] hover:border-[#444]"
            }`}
          >
            {favorited ? "★ Nei preferiti" : "☆ Aggiungi ai preferiti"}
          </button>
        </div>
      </div>

      {/* Review Form */}
      <div className="mt-8 bg-[#141414] border border-[#1e1e1e] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">La tua recensione</h2>
        <div className="mb-3">
          <StarRating value={rating} interactive onChange={setRating} size={22} />
        </div>
        <textarea
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          placeholder="Scrivi qualcosa (opzionale)..."
          rows={3}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#c8a97e] transition-colors resize-none"
        />
        <button
          onClick={handleReview}
          disabled={submitting || !rating}
          className="mt-3 px-5 py-2 bg-[#c8a97e] hover:bg-[#e8c99e] disabled:opacity-40 text-[#0d0d0d] text-sm font-semibold rounded-lg transition-colors"
        >
          {submitting ? "Salvo..." : "Salva recensione"}
        </button>
      </div>
    </div>
  );
}
