"use client";

import { useMemo } from "react";
import type { MediaCategory } from "@/types/media";
import type { FeedItem } from "../types/social";

export function useFeedFilters(items: FeedItem[], category?: MediaCategory) {
  return useMemo(() => {
    if (!category) {
      return items;
    }

    return items.filter((item) => item.category === category);
  }, [category, items]);
}
