export type MediaItem = {
  id: string;
  type: "film" | "serie" | "libro" | "musica";
  title: string;
  year: number;
  genre: string;
  cover: string;
  score: number;
  reviewCount: number;
};

export type ReviewItem = {
  id: string;
  user: { name: string; username: string; avatar: string };
  media: { title: string; type: string; cover: string };
  rating: number;
  text: string;
  date: string;
  likes: number;
  tags: string[];
};

export type ActivityItem = {
  id: string;
  user: { name: string; avatar: string };
  action: string;
  media: string;
  time: string;
  type: "review" | "complete" | "list" | "rate";
};

export type ListItem = {
  id: string;
  title: string;
  author: { name: string; avatar: string };
  coverImages: string[];
  itemCount: number;
  likes: number;
  description: string;
  tags: string[];
  isPublic: boolean;
};

export const MOCK_MEDIA: MediaItem[] = [
  { id: "1", type: "film", title: "Past Lives", year: 2023, genre: "Dramma", cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop", score: 4.7, reviewCount: 1240 },
  { id: "2", type: "serie", title: "Severance", year: 2022, genre: "Thriller", cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop", score: 4.8, reviewCount: 3100 },
  { id: "3", type: "libro", title: "Normal People", year: 2018, genre: "Narrativa", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop", score: 4.2, reviewCount: 870 },
  { id: "4", type: "musica", title: "Rodrigo — SOUR", year: 2021, genre: "Pop", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop", score: 4.5, reviewCount: 5400 },
  { id: "5", type: "film", title: "Everything Everywhere", year: 2022, genre: "Fantascienza", cover: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop", score: 4.9, reviewCount: 8200 },
  { id: "6", type: "serie", title: "The Bear", year: 2022, genre: "Dramma", cover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=450&fit=crop", score: 4.6, reviewCount: 2900 },
  { id: "7", type: "libro", title: "Tomorrow, and Tomorrow", year: 2022, genre: "Narrativa", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop", score: 4.3, reviewCount: 540 },
  { id: "8", type: "musica", title: "Mitski — Laurel Hell", year: 2022, genre: "Indie Rock", cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=450&fit=crop", score: 4.4, reviewCount: 1100 }
];

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    user: { name: "Elena Russo", username: "elenarusso", avatar: "https://i.pravatar.cc/150?img=47" },
    media: { title: "Past Lives", type: "Film", cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop" },
    rating: 5,
    text: "Un film che non ti lascia. La regia cattura i silenzi con una precisione devastante — ogni sguardo è un dialogo che non verrà mai detto ad alta voce.",
    date: "3 ore fa",
    likes: 42,
    tags: ["cinematografia", "emotivo", "lento-ma-perfetto"]
  },
  {
    id: "r2",
    user: { name: "Marco Ferri", username: "marcoferri", avatar: "https://i.pravatar.cc/150?img=12" },
    media: { title: "Severance", type: "Serie", cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop" },
    rating: 5,
    text: "Il corpo in ufficio non sa nulla della vita fuori. È la metafora più brutale e precisa sul lavoro moderno che ho mai visto in tv. Disturbing in the best way.",
    date: "7 ore fa",
    likes: 89,
    tags: ["distopico", "metafora", "thriller"]
  },
  {
    id: "r3",
    user: { name: "Sofia Gallo", username: "sofiagallo", avatar: "https://i.pravatar.cc/150?img=31" },
    media: { title: "Normal People", type: "Libro", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop" },
    rating: 4,
    text: "Sally Rooney scrive dialoghi come se stesse trascrivendo pensieri, non conversazioni. Non tutto funziona ma quando funziona — fa malissimo.",
    date: "1 giorno fa",
    likes: 31,
    tags: ["narrativa-contemporanea", "relazioni", "irlanda"]
  },
  {
    id: "r4",
    user: { name: "Luca Bianchi", username: "lucabianchi", avatar: "https://i.pravatar.cc/150?img=8" },
    media: { title: "Everything Everywhere", type: "Film", cover: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop" },
    rating: 5,
    text: "Inizia come caos totale e finisce come una lettera d'amore al multiverso. Non dovrebbe funzionare e invece è commovente in modo assurdo.",
    date: "2 giorni fa",
    likes: 156,
    tags: ["multiverse", "commovente", "a24"]
  }
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: "a1", user: { name: "Elena", avatar: "https://i.pravatar.cc/150?img=47" }, action: "ha recensito", media: "Past Lives", time: "3 min fa", type: "review" },
  { id: "a2", user: { name: "Marco", avatar: "https://i.pravatar.cc/150?img=12" }, action: "ha completato", media: "Severance S2", time: "18 min fa", type: "complete" },
  { id: "a3", user: { name: "Sofia", avatar: "https://i.pravatar.cc/150?img=31" }, action: "ha aggiunto a lista", media: "Normal People", time: "34 min fa", type: "list" },
  { id: "a4", user: { name: "Luca", avatar: "https://i.pravatar.cc/150?img=8" }, action: "ha valutato", media: "The Bear", time: "1 ora fa", type: "rate" },
  { id: "a5", user: { name: "Giulia", avatar: "https://i.pravatar.cc/150?img=25" }, action: "ha recensito", media: "Mitski — Laurel Hell", time: "2 ore fa", type: "review" },
  { id: "a6", user: { name: "Andrea", avatar: "https://i.pravatar.cc/150?img=60" }, action: "ha completato", media: "Tomorrow, and Tomorrow", time: "4 ore fa", type: "complete" }
];

export const MOCK_LISTS: ListItem[] = [
  {
    id: "l1",
    title: "Film che mi hanno cambiato",
    author: { name: "Elena Russo", avatar: "https://i.pravatar.cc/150?img=47" },
    coverImages: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=200&h=300&fit=crop"
    ],
    itemCount: 23,
    likes: 184,
    description: "Non film che mi sono piaciuti di più — film che hanno spostato qualcosa. In ordine di quando li ho visti.",
    tags: ["personale", "cinema", "formativo"],
    isPublic: true
  },
  {
    id: "l2",
    title: "Serie da finire prima di morire",
    author: { name: "Marco Ferri", avatar: "https://i.pravatar.cc/150?img=12" },
    coverImages: [
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512427626839-fbed5e12a9d4?w=200&h=300&fit=crop"
    ],
    itemCount: 12,
    likes: 97,
    description: "Quelle che ogni volta rimando e poi mi pento. Lista aggiornata ogni trimestre.",
    tags: ["serie", "watchlist", "must-see"],
    isPublic: true
  },
  {
    id: "l3",
    title: "Libri per sentirsi meno soli",
    author: { name: "Sofia Gallo", avatar: "https://i.pravatar.cc/150?img=31" },
    coverImages: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=200&h=300&fit=crop"
    ],
    itemCount: 18,
    likes: 231,
    description: "Narrativa contemporanea che parla di connessione, distanza, solitudine. Per le notti difficili.",
    tags: ["letteratura", "emotivo", "contemporaneo"],
    isPublic: true
  },
  {
    id: "l4",
    title: "Musica da ascoltare da soli in macchina",
    author: { name: "Luca Bianchi", avatar: "https://i.pravatar.cc/150?img=8" },
    coverImages: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=300&fit=crop"
    ],
    itemCount: 34,
    likes: 418,
    description: "La colonna sonora dei viaggi notturni. Album e singoli per quando sei solo con la strada.",
    tags: ["musica", "viaggio", "notturna"],
    isPublic: true
  },
  {
    id: "l5",
    title: "A24 — tutto in ordine di preferenza",
    author: { name: "Giulia Esposito", avatar: "https://i.pravatar.cc/150?img=25" },
    coverImages: [
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=300&fit=crop"
    ],
    itemCount: 41,
    likes: 672,
    description: "Ho visto ogni film A24 prodotto. Questa è la classifica definitiva, aggiornata dopo ogni uscita.",
    tags: ["a24", "cinema", "ranking"],
    isPublic: true
  },
  {
    id: "l6",
    title: "Anime che vale davvero la pena",
    author: { name: "Andrea Colombo", avatar: "https://i.pravatar.cc/150?img=60" },
    coverImages: [
      "https://images.unsplash.com/photo-1541562232579-512a21360020?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=300&fit=crop"
    ],
    itemCount: 27,
    likes: 309,
    description: "Solo quelli che consiglierei anche a chi dice 'non mi piacciono gli anime'. Filtro qualità severo.",
    tags: ["anime", "curato", "gateway"],
    isPublic: true
  }
];

export const MOCK_PROFILE = {
  username: "ryuzakxx",
  name: "Francesco M.",
  bio: "Cerco storie che lascino qualcosa. Sviluppatore di giorno, cinefilo di notte.",
  avatar: "https://i.pravatar.cc/150?img=57",
  banner: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&h=400&fit=crop",
  location: "Taranto, IT",
  joinedYear: 2023,
  stats: { logged: 312, reviews: 87, lists: 14, followers: 430, following: 218 },
  tasteFingerprint: [
    { label: "Dramma", value: 82 },
    { label: "Sci-Fi", value: 74 },
    { label: "Indie", value: 68 },
    { label: "Horror", value: 61 },
    { label: "Animazione", value: 55 }
  ],
  recentMedia: [
    { title: "Past Lives", cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=120&h=180&fit=crop", rating: 5 },
    { title: "Severance", cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=120&h=180&fit=crop", rating: 5 },
    { title: "The Bear", cover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=120&h=180&fit=crop", rating: 4 },
    { title: "Normal People", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop", rating: 4 },
    { title: "SOUR", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=180&fit=crop", rating: 5 },
    { title: "Mitski", cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=120&h=180&fit=crop", rating: 4 }
  ],
  topGenres: ["Dramma", "Sci-Fi", "Indie Rock", "Horror", "Animazione"],
  compatibleUsers: [
    { name: "Elena", avatar: "https://i.pravatar.cc/150?img=47", compat: 92 },
    { name: "Sofia", avatar: "https://i.pravatar.cc/150?img=31", compat: 87 },
    { name: "Giulia", avatar: "https://i.pravatar.cc/150?img=25", compat: 81 }
  ]
};
