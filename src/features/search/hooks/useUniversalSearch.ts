"use client";

import { useMemo, useState } from "react";
import type { SearchFilter, SearchItem } from "../types/search";

export function useUniversalSearch(items: SearchItem[]) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>("all");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesFilter = filter === "all" || item.category === filter;
      const matchesQuery = !normalizedQuery || `${item.title} ${item.meta}`.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, items, query]);

  return { filter, query, results, setFilter, setQuery };
}
