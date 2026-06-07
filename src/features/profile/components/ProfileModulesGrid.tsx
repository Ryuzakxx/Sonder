"use client";

import { useProfileModules } from "../hooks/useProfileModules";
import type { ProfileModule } from "../types/profile";
import { ProfileModuleCard } from "./ProfileModuleCard";

type ProfileModulesGridProps = {
  modules: ProfileModule[];
};

export function ProfileModulesGrid({ modules }: ProfileModulesGridProps) {
  const { collapsedIds, toggleModule, visibleModules } = useProfileModules(modules);

  return (
    <div className="modules">
      {visibleModules.map((module) => (
        <ProfileModuleCard
          collapsed={collapsedIds.has(module.id)}
          key={module.id}
          module={module}
          onToggle={() => toggleModule(module.id)}
        />
      ))}
    </div>
  );
}
