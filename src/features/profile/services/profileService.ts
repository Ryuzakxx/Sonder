const profile = {
  username: "night.archive",
  name: "Lea Moretti",
  bio: "Sonder è una piattaforma social premium per tracciare media, recensire, votare, creare liste e mostrare i propri gusti come un archivio vivo della propria cultura personale.",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
  banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=82",
  location: "Roma",
  joinedYear: 2021,
  stats: {
    logged: 562,
    reviews: 148,
    lists: 23,
    followers: 1340,
    following: 287,
    film: 412,
    serie: 61,
    libri: 89,
    giochi: 34,
  },
  tasteFingerprint: [
    { label: "Cinema d'autore",   value: 88, color: "#ead4a4" },
    { label: "Narrativa letteraria", value: 74, color: "#bac7ff" },
    { label: "Horror atmosferico", value: 67, color: "#f4a8d4" },
    { label: "Giochi di ruolo",   value: 52, color: "#b0ecd8" },
    { label: "Serie drammatiche", value: 45, color: "#c4b5fd" },
  ],
  favorites: {
    film: {
      title: "L'albero della vita",
      cover: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=260&q=80",
      year: 2011,
    },
    serie: {
      title: "Twin Peaks",
      cover: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=260&q=80",
      year: 1990,
    },
    libro: {
      title: "Le città invisibili",
      cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=260&q=80",
      year: 1972,
    },
    gioco: {
      title: "Disco Elysium",
      cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=260&q=80",
      year: 2019,
    },
  },
  topGenres: [
    "Slow cinema", "New weird", "Folk horror", "Arthouse",
    "Narrativa italiana", "JRPG", "Miniserie", "Noir letterario",
  ],
  compatibleUsers: [
    {
      name: "Marco Silvestri",
      handle: "m.silvestri",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
      compat: 91,
    },
    {
      name: "Giulia Ferrara",
      handle: "giulia.f",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
      compat: 78,
    },
    {
      name: "Davide Conti",
      handle: "dav.conti",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
      compat: 65,
    },
  ],
};

export async function getProfile() {
  return profile;
}
