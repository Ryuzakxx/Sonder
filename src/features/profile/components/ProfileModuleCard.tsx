import Image from "next/image";
import { MetricPill } from "@/components/shared";
import type { ProfileModule } from "../types/profile";

type ProfileModuleCardProps = {
  collapsed: boolean;
  module: ProfileModule;
  onToggle: () => void;
};

export function ProfileModuleCard({ collapsed, module, onToggle }: ProfileModuleCardProps) {
  return (
    <article className="module">
      <button className="module-head" onClick={onToggle} type="button">
        <span className="mini-label">{module.title}</span>
        <span className="drag">::</span>
      </button>
      {collapsed ? null : <ProfileModuleContent module={module} />}
    </article>
  );
}

function ProfileModuleContent({ module }: { module: ProfileModule }) {
  if (module.kind === "covers") {
    return (
      <div className="stacked-covers">
        {module.covers?.map((cover) => (
          <span className="cover-dot" key={cover.src}>
            <Image alt={cover.alt} height={66} src={cover.src} width={44} />
          </span>
        ))}
      </div>
    );
  }

  if (module.kind === "stats") {
    return (
      <div className="stats-row">
        {module.stats?.map((stat) => (
          <MetricPill key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="review-text">{module.text}</p>
      {module.kind === "reading" ? <div className="skeleton" /> : null}
    </>
  );
}
