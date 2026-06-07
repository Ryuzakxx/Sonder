import type { SearchFilter } from "../types/search";

export type SearchStore = {
  filter: SearchFilter;
  query: string;
};

export const initialSearchStore: SearchStore = {
  filter: "all",
  query: ""
};
