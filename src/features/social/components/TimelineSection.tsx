import { Panel, SectionHeader } from "@/components/ui";
import type { TimelineItem } from "../types/social";

type TimelineSectionProps = {
  items: TimelineItem[];
};

export function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <Panel>
      <SectionHeader description="Blocchi comprimibili e riordinabili nel profilo." title="Timeline attivita" />
      <div className="timeline">
        {items.map((item) => (
          <div className="timeline-item" key={item.id}>
            <span className="pulse" />
            <span>{item.label}</span>
            <span className="time">{item.time}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
