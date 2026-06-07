"use client";

import Image from "next/image";
import { Badge, Panel, SectionHeader } from "@/components/ui";
import { mediaCategories } from "@/constants/mediaCategories";
import { useUniversalSearch } from "../hooks/useUniversalSearch";
import type { SearchItem } from "../types/search";

type UniversalSearchProps = {
  items: SearchItem[];
};

export function UniversalSearch({ items }: UniversalSearchProps) {
  const search = useUniversalSearch(items);

  return (
    <Panel className="search-panel" id="ricerca">
      <SectionHeader description="Risultati istantanei su ogni tipo di media." title="Ricerca universale" />
      <label className="search-box">
        <span>Search</span>
        <input
          onChange={(event) => search.setQuery(event.target.value)}
          placeholder="Cerca film, libri, album, giochi..."
          type="search"
          value={search.query}
        />
      </label>
      <div className="filters" role="list" aria-label="Filtri media">
        {mediaCategories.map((category) => (
          <button
            className={category === search.filter ? "filter active" : "filter"}
            key={category}
            onClick={() => search.setFilter(category)}
            type="button"
          >
            {category === "all" ? "Tutto" : category}
          </button>
        ))}
      </div>
      <div className="results">
        {search.results.map((item) => (
          <article className="result-card" key={item.id}>
            <div className="result-art">
              <Image alt={item.artwork.alt} height={58} src={item.artwork.src} width={58} />
            </div>
            <div>
              <div className="result-top">
                <strong>{item.title}</strong>
                <Badge>{item.category}</Badge>
              </div>
              <p>{item.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
