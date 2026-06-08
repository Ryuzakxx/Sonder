"use client";
import { useState, useEffect, useCallback } from "react";
import { searchService } from "@/services/search.service";
import type { MediaSearchResult } from "@/types";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debouncedValue;
}

export function useSearch(query: string) {
  const [results, setResults] = useState<{ films: MediaSearchResult[]; serie: MediaSearchResult[]; libri: MediaSearchResult[] }>({
    films: [], serie: [], libri: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) { setResults({ films: [], serie: [], libri: [] }); return; }
    setIsLoading(true);
    try {
      const data = await searchService.search(q);
      setResults(data);
    } catch { setResults({ films: [], serie: [], libri: [] }); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchResults(debouncedQuery); }, [debouncedQuery, fetchResults]);

  return { results, isLoading };
}
