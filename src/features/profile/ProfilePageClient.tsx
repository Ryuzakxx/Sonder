"use client";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import type { Profile, Review, Activity } from "@/types";

const MEDIA_FILTERS = [
  { id: "tutto", label: "Tutto" },
  { id: "film", label: "Film" },
  { id: "serie", label: "Serie" },
  { id: "libro", label: "Libri" },
  { id: "musica", label: "Musica" },
  { id: "gioco", label: "Giochi" },
] as const;

type Filter = typeof MEDIA_FILTERS[number]["id"];

export function ProfilePageClient({
  profile, reviews, activities
}: {
  profile: Profile;
  reviews: Review[];
  activities: Activity[];
}) {
  const [filter, setFilter] = useState<Filter>("tutto");
  const [tab, setTab] = useState<"log" | "attivita" | "liste">("log");

  const filteredReviews = filter === "tutto" ? reviews : reviews.filter(r => r.media_type === filter);

  return (
    <div>
      {/* Banner */}
      <div className="relative h-32 sm:h-44 rounded-xl overflow-hidden mb-0 bg-gradient-to-r from-[#1a1005] via-[#1e1810] to-[#0d0d0d]">
        {profile.banner_url && (
          <img src={profile.banner_url} alt="" className="w-full h-full object-cover" loading="lazy" />
        )}
      </div>

      {/* Header */}
      <div className="px-1 mb-6">
        <div className="flex items-end justify-between -mt-8 mb-4">
          <div className="border-4 border-[#0d0d0d] rounded-full">
            <Avatar src={profile.avatar_url} name={profile.display_name ?? profile.username} size={64} />
          </div>
        </div>
        <h1 className="text-xl font-bold text-white">{profile.display_name ?? profile.username}</h1>
        <p className="text-[#555] text-sm">@{profile.username}</p>
        {profile.bio && <p className="text-[#aaa] text-sm mt-2 max-w-lg">{profile.bio}</p>}
        <div className="flex gap-4 mt-3">
          <span className="text-xs text-[#555]">
            <span className="text-white font-medium">{profile.followers_count ?? 0}</span> follower
          </span>
          <span className="text-xs text-[#555]">
            <span className="text-white font-medium">{profile.following_count ?? 0}</span> seguiti
          </span>
          <span className="text-xs text-[#555]">
            <span className="text-white font-medium">{profile.reviews_count ?? 0}</span> recensioni
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#1e1e1e] mb-4">
        {(["log", "attivita", "liste"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t ? "border-[#c8a97e] text-[#c8a97e]" : "border-transparent text-[#555] hover:text-[#888]"
            }`}
          >
            {t === "log" ? "Log" : t === "attivita" ? "Attività" : "Liste"}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      {tab === "log" && (
        <div className="flex gap-2 flex-wrap mb-4">
          {MEDIA_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filter === f.id
                  ? "bg-[#c8a97e] border-[#c8a97e] text-[#0d0d0d] font-medium"
                  : "border-[#2a2a2a] text-[#666] hover:border-[#444] hover:text-[#aaa]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Log tab */}
      {tab === "log" && (
        <div>
          {filteredReviews.length === 0 ? (
            <p className="text-[#444] text-sm py-8 text-center">Nessun elemento nel log.</p>
          ) : (
            <div className="space-y-3">
              {filteredReviews.map(review => (
                <article key={review.id} className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-4 flex gap-3">
                  {review.media_cover && (
                    <img src={review.media_cover} alt="" className="w-10 h-14 object-cover rounded shrink-0" loading="lazy" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-white text-sm font-medium truncate">{review.media_title}</p>
                      <StarRating value={review.rating} size={12} />
                    </div>
                    <p className="text-[#555] text-xs capitalize mt-0.5">{review.media_type}</p>
                    {review.body && <p className="text-[#888] text-sm mt-2 line-clamp-2">{review.body}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Activity tab */}
      {tab === "attivita" && (
        <div className="space-y-2">
          {activities.length === 0 ? (
            <p className="text-[#444] text-sm py-8 text-center">Nessuna attività.</p>
          ) : activities.map(a => (
            <div key={a.id} className="flex items-center gap-3 py-2.5 border-b border-[#1a1a1a] last:border-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c8a97e] shrink-0" />
              <p className="text-[#aaa] text-sm flex-1">
                {a.action}{a.media_title && <span className="text-white"> {a.media_title}</span>}
              </p>
              <span className="text-[#444] text-xs">{new Date(a.created_at).toLocaleDateString("it-IT")}</span>
            </div>
          ))}
        </div>
      )}

      {/* Lists tab */}
      {tab === "liste" && (
        <p className="text-[#444] text-sm py-8 text-center">Nessuna lista pubblica.</p>
      )}
    </div>
  );
}
