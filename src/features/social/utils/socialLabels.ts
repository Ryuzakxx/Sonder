import type { MediaCategory } from "@/types/media";

export function getCategoryLabel(category: MediaCategory) {
  const labels: Record<MediaCategory, string> = {
    film: "Film",
    book: "Libro",
    music: "Musica",
    game: "Gioco"
  };

  return labels[category];
}
