import type { ActivityItem as ActivityItemType } from "@/lib/mock-data";

const ACTION_ICONS: Record<ActivityItemType["type"], string> = {
  review: "✍️",
  complete: "✅",
  list: "📌",
  rate: "⭐"
};

type ActivityItemProps = {
  item: ActivityItemType;
};

export function ActivityItem({ item }: ActivityItemProps) {
  return (
    <div className="timeline-item">
      <div className="tiny-avatar">
        <img src={item.user.avatar} alt={item.user.name} width={34} height={34} />
      </div>
      <div style={{ minWidth: 0 }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>{item.user.name}</span>
        <span style={{ color: "var(--muted)", fontSize: 14 }}> {item.action} </span>
        <span style={{ color: "var(--text)", fontWeight: 600, fontSize: 14 }}>{item.media}</span>
        <div style={{ color: "var(--faint)", fontSize: 12, marginTop: 2 }}>{item.time}</div>
      </div>
      <span style={{ fontSize: 18 }} role="img" aria-label={item.type}>{ACTION_ICONS[item.type]}</span>
    </div>
  );
}
