import type { FeaturedCollection } from "../types/list";

export async function getFeaturedCollections(): Promise<FeaturedCollection[]> {
  return [
    {
      id: "life-changing-films",
      title: "Film che mi hanno cambiato",
      meta: "32 elementi - 8 collaboratori",
      artworks: [
        { src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80", alt: "Cinema d'autore" },
        { src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=300&q=80", alt: "Strada di notte" },
        { src: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=300&q=80", alt: "Sala cinema" },
        { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", alt: "Mare al tramonto" }
      ]
    },
    {
      id: "night-albums",
      title: "Album da ascoltare di notte",
      meta: "18 elementi - pubblico",
      artworks: [
        { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80", alt: "Vinile su giradischi" },
        { src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=300&q=80", alt: "Cuffie e luce rossa" },
        { src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=300&q=80", alt: "Studio musicale" },
        { src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=300&q=80", alt: "Concerto notturno" }
      ]
    }
  ];
}
