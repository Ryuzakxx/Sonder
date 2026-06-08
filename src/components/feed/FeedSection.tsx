"use client";
import { useEffect, useState } from "react";
import { reviewService } from "@/services/review.service";
import { activityService } from "@/services/activity.service";
import { ReviewCard } from "./ReviewCard";
import { ActivityCard } from "./ActivityCard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Review, Activity } from "@/types";

type Tab = "recensioni" | "attivita";

export function FeedSection() {
  const [tab, setTab] = useState<Tab>("recensioni");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([reviewService.getFeed(), activityService.getFeed()])
      .then(([r, a]) => { setReviews(r); setActivities(a); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div className="flex gap-1 mb-4 border-b border-[#1e1e1e]">
        {(["recensioni", "attivita"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t ? "border-[#c8a97e] text-[#c8a97e]" : "border-transparent text-[#555] hover:text-[#888]"
            }`}
          >
            {t === "attivita" ? "Attività" : "Recensioni"}
          </button>
        ))}
      </div>

      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24" />)}
        </div>
      )}

      {!loading && tab === "recensioni" && (
        reviews.length === 0
          ? <EmptyState label="Nessuna recensione ancora" />
          : <div className="space-y-3">{reviews.map(r => <ReviewCard key={r.id} review={r} />)}</div>
      )}

      {!loading && tab === "attivita" && (
        activities.length === 0
          ? <EmptyState label="Nessuna attività ancora" />
          : <div className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-2">
              {activities.map(a => <ActivityCard key={a.id} activity={a} />)}
            </div>
      )}
    </section>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-12 text-[#444]">
      <div className="text-3xl mb-2">◌</div>
      <p className="text-sm">{label}</p>
    </div>
  );
}
