import { Panel, SectionHeader } from "@/components/ui";
import type { FeedItem } from "../types/social";
import { FeedCard } from "./FeedCard";

type FeedSectionProps = {
  items: FeedItem[];
};

export function FeedSection({ items }: FeedSectionProps) {
  return (
    <Panel id="feed">
      <SectionHeader
        badge="Live"
        description="Recensioni, voti, liste e completamenti dalla community."
        title="Feed visivo"
      />
      <div className="feed-list">
        {items.map((item) => (
          <FeedCard item={item} key={item.id} />
        ))}
      </div>
    </Panel>
  );
}
