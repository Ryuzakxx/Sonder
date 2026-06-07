"use client";

import { useMemo, useState } from "react";
import type { ProfileModule } from "../types/profile";

export function useProfileModules(modules: ProfileModule[]) {
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const visibleModules = useMemo(() => modules, [modules]);

  function toggleModule(moduleId: string) {
    setCollapsedIds((current) => {
      const next = new Set(current);
      next.has(moduleId) ? next.delete(moduleId) : next.add(moduleId);
      return next;
    });
  }

  return { collapsedIds, toggleModule, visibleModules };
}
