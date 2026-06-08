import type { Activity } from "@/types";
import { Avatar } from "@/components/ui/Avatar";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ora";
  if (mins < 60) return `${mins}m fa`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h fa`;
  const days = Math.floor(hours / 24);
  return days < 7 ? `${days}g fa` : new Date(dateStr).toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
}

export function ActivityCard({ activity }: { activity: Activity }) {
  const profile = activity.profile;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[#1a1a1a] last:border-0">
      <Avatar src={profile?.avatar_url} name={profile?.display_name ?? profile?.username} size={32} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#ccc] leading-snug">
          <a href={`/profile/${profile?.username}`} className="text-[#c8a97e] hover:underline font-medium">
            @{profile?.username ?? "utente"}
          </a>
          {" "}{activity.action}
          {activity.media_title && (
            <span className="text-white font-medium"> {activity.media_title}</span>
          )}
        </p>
        <span className="text-xs text-[#444]">{timeAgo(activity.created_at)}</span>
      </div>
      {activity.media_cover && (
        <img src={activity.media_cover} alt="" className="w-8 h-10 object-cover rounded shrink-0" loading="lazy" />
      )}
    </div>
  );
}
