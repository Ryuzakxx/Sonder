import type { UserProfile } from "../types/profile";

const profile: UserProfile = {
  name: "Lea Moretti",
  handle: "@night.archive",
  location: "Roma",
  bio: "Sonder e una piattaforma social premium per tracciare media, recensire, votare, creare liste e mostrare i propri gusti come un archivio vivo della propria cultura personale.",
  affinityScore: 84,
  avatar: {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
    alt: "Ritratto profilo di Lea"
  },
  banner: {
    src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=82",
    alt: "Palco con microfono e luce cinematografica"
  },
  modules: [
    {
      id: "favorite-films",
      title: "Film preferiti",
      kind: "covers",
      covers: [
        { src: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=260&q=80", alt: "Poster astratto film" },
        { src: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=260&q=80", alt: "Poster cinema urbano" },
        { src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=260&q=80", alt: "Poster paesaggio lunare" }
      ]
    },
    {
      id: "statistics",
      title: "Statistiche",
      kind: "stats",
      stats: [
        { value: 412, label: "film" },
        { value: 89, label: "libri" },
        { value: 61, label: "album" }
      ]
    },
    { id: "currently-reading", title: "In lettura", kind: "reading", text: "Atlante delle citta invisibili" },
    {
      id: "favorite-quote",
      title: "Citazione",
      kind: "quote",
      text: "\"Mi piacciono le opere che lasciano una stanza accesa dopo i titoli.\""
    }
  ]
};

export async function getProfile() {
  return profile;
}
