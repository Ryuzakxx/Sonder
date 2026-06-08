"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface SearchState {
  isOpen: boolean;
  query: string;
  open: () => void;
  close: () => void;
  setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchState>({
  isOpen: false,
  query: "",
  open: () => {},
  close: () => {},
  setQuery: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQueryState] = useState("");

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => { setIsOpen(false); setQueryState(""); }, []);
  const setQuery = useCallback((q: string) => setQueryState(q), []);

  return (
    <SearchContext.Provider value={{ isOpen, query, open, close, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  return useContext(SearchContext);
}
