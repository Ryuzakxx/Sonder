import { Badge } from "./Badge";

type SectionHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
};

export function SectionHeader({ title, description, badge }: SectionHeaderProps) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {badge ? <Badge>{badge}</Badge> : null}
    </div>
  );
}
