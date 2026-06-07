import type { SearchItem } from "../types/search";

export async function getSearchIndex(): Promise<SearchItem[]> {
  return [
    {
      id: "quiet-meridian",
      title: "The Quiet Meridian",
      category: "film",
      meta: "Film - 2026 - 4.4",
      artwork: {
        src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=180&q=80",
        alt: "Poster The Quiet Meridian"
      }
    },
    {
      id: "night-roads",
      title: "Night Roads",
      category: "music",
      meta: "Album - Dream pop - 5.0",
      artwork: {
        src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=180&q=80",
        alt: "Copertina Night Roads"
      }
    },
    {
      id: "elden-vale",
      title: "Elden Vale",
      category: "game",
      meta: "Videogioco - RPG - 96",
      artwork: {
        src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=180&q=80",
        alt: "Artwork Elden Vale"
      }
    },
    {
      id: "invisible-cities",
      title: "Atlante delle citta invisibili",
      category: "book",
      meta: "Libro - In lettura - 68%",
      artwork: {
        src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=180&q=80",
        alt: "Libro su tavolo vicino alla finestra"
      }
    }
  ];
}
