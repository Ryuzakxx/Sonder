"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { SearchResults, SearchCategory } from "@/services/search";

const DEBOUNCE_MS = 350;

type UseSearchReturn = {
  query: string;
  setQuery: (q: string) => void;
  category: SearchCategory;
  setCategory: (c: SearchCategory) => void;
  results: SearchResults;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  hasQuery: boolean;
};

const EMPTY_RESULTS: SearchResults = { film: [], serie: [], libri: [] };

export function useSearch(): UseSearchReturn {
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState<SearchCategory>("tutto");
  const [results, setResults]   = useState<SearchResults>(EMPTY_RESULTS);
  const [isLoading, setLoading] = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const abortRef  = useRef<AbortController | null>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchResults = useCallback(async (q: string, cat: SearchCategory) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}&type=${cat}`,
        { signal: abortRef.current.signal }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: SearchResults = await res.json();
      setResults(data);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError("Errore durante la ricerca. Riprova.");
      setResults(EMPTY_RESULTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!query.trim() || query.length < 2) {
      setResults(EMPTY_RESULTS);
      setLoading(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(() => {
      fetchResults(query, category);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, category, fetchResults]);

  const total = results.film.length + results.serie.length + results.libri.length;

  return {
    query, setQuery,
    category, setCategory,
    results,
    isLoading,
    error,
    isEmpty: !isLoading && query.length >= 2 && total === 0,
    hasQuery: query.length >= 2,
  };
}
