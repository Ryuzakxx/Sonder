import type { FeaturedMedia } from "../types/media";

export async function getFeaturedMedia(): Promise<FeaturedMedia> {
  return {
    id: "quiet-meridian",
    title: "The Quiet Meridian",
    category: "film",
    year: 2026,
    genre: "Dramma contemplativo",
    description:
      "Un viaggio cinematografico tra memoria, paesaggi costieri e identita. La pagina media unifica backdrop, voti, recensioni, azioni rapide e attivita social senza perdere atmosfera.",
    poster: {
      src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=700&q=84",
      alt: "Poster del film The Quiet Meridian"
    },
    backdrop: {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=86",
      alt: "Paesaggio costiero usato come backdrop cinematografico"
    },
    ratingDistribution: [24, 36, 64, 88, 72]
  };
}
