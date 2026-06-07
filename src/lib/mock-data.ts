// ──────────────────────────── Tipi ────────────────────────────
export type MediaType = "film" | "serie" | "libro" | "musica" | "gioco";

export type MediaItem = {
  id: string;
  type: MediaType;
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

/** Singola voce nel log personale di un utente */
export type ProfileLogItem = {
  id: string;
  mediaType: MediaType;
  title: string;
  cover: string;
  rating: number;        // 0-5
  loggedAt: string;      // data leggibile
  status: "completato" | "in-corso" | "abbandonato" | "voglio";
  review?: string;       // testo breve opzionale
  tags?: string[];
};

/** Evento nella timeline pubblica del profilo */
export type TimelineEvent = {
  id: string;
  mediaType: MediaType;
  action: "completato" | "recensito" | "aggiunto a lista" | "iniziato" | "salvato";
  title: string;
  cover: string;
  rating?: number;
  excerpt?: string;
  date: string;
};

// ──────────────────────────── MOCK_MEDIA ────────────────────────────
export const MOCK_MEDIA: MediaItem[] = [
  { id: "1", type: "film",  title: "Past Lives",              year: 2023, genre: "Dramma",      cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop", score: 4.7, reviewCount: 1240 },
  { id: "2", type: "serie", title: "Severance",               year: 2022, genre: "Thriller",    cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop", score: 4.8, reviewCount: 3100 },
  { id: "3", type: "libro", title: "Normal People",           year: 2018, genre: "Narrativa",   cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop", score: 4.2, reviewCount: 870  },
  { id: "4", type: "musica",title: "Rodrigo — SOUR",          year: 2021, genre: "Pop",         cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop", score: 4.5, reviewCount: 5400 },
  { id: "5", type: "film",  title: "Everything Everywhere",  year: 2022, genre: "Fantascienza", cover: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop", score: 4.9, reviewCount: 8200 },
  { id: "6", type: "serie", title: "The Bear",                year: 2022, genre: "Dramma",      cover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=450&fit=crop", score: 4.6, reviewCount: 2900 },
  { id: "7", type: "libro", title: "Tomorrow, and Tomorrow", year: 2022, genre: "Narrativa",   cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop", score: 4.3, reviewCount: 540  },
  { id: "8", type: "musica",title: "Mitski — Laurel Hell",    year: 2022, genre: "Indie Rock",  cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=450&fit=crop", score: 4.4, reviewCount: 1100 },
];

// ──────────────────────────── MOCK_REVIEWS ────────────────────────────
export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    user: { name: "Elena Russo", username: "elenarusso", avatar: "https://i.pravatar.cc/150?img=47" },
    media: { title: "Past Lives", type: "Film", cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop" },
    rating: 5, likes: 42, date: "3 ore fa",
    text: "Un film che non ti lascia. La regia cattura i silenzi con una precisione devastante — ogni sguardo è un dialogo che non verrà mai detto ad alta voce.",
    tags: ["cinematografia", "emotivo", "lento-ma-perfetto"]
  },
  {
    id: "r2",
    user: { name: "Marco Ferri", username: "marcoferri", avatar: "https://i.pravatar.cc/150?img=12" },
    media: { title: "Severance", type: "Serie", cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop" },
    rating: 5, likes: 89, date: "7 ore fa",
    text: "Il corpo in ufficio non sa nulla della vita fuori. È la metafora più brutale e precisa sul lavoro moderno che ho mai visto in tv.",
    tags: ["distopico", "metafora", "thriller"]
  },
  {
    id: "r3",
    user: { name: "Sofia Gallo", username: "sofiagallo", avatar: "https://i.pravatar.cc/150?img=31" },
    media: { title: "Normal People", type: "Libro", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop" },
    rating: 4, likes: 31, date: "1 giorno fa",
    text: "Sally Rooney scrive dialoghi come se stesse trascrivendo pensieri, non conversazioni. Non tutto funziona ma quando funziona — fa malissimo.",
    tags: ["narrativa-contemporanea", "relazioni", "irlanda"]
  },
  {
    id: "r4",
    user: { name: "Luca Bianchi", username: "lucabianchi", avatar: "https://i.pravatar.cc/150?img=8" },
    media: { title: "Everything Everywhere", type: "Film", cover: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop" },
    rating: 5, likes: 156, date: "2 giorni fa",
    text: "Inizia come caos totale e finisce come una lettera d'amore al multiverso. Non dovrebbe funzionare e invece è commovente in modo assurdo.",
    tags: ["multiverse", "commovente", "a24"]
  },
];

// ──────────────────────────── MOCK_ACTIVITY ───────────────────────────
export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: "a1", user: { name: "Elena",  avatar: "https://i.pravatar.cc/150?img=47" }, action: "ha recensito",      media: "Past Lives",             time: "3 min fa",  type: "review"   },
  { id: "a2", user: { name: "Marco",  avatar: "https://i.pravatar.cc/150?img=12" }, action: "ha completato",    media: "Severance S2",           time: "18 min fa", type: "complete"  },
  { id: "a3", user: { name: "Sofia",  avatar: "https://i.pravatar.cc/150?img=31" }, action: "ha aggiunto a lista", media: "Normal People",        time: "34 min fa", type: "list"     },
  { id: "a4", user: { name: "Luca",   avatar: "https://i.pravatar.cc/150?img=8"  }, action: "ha valutato",      media: "The Bear",               time: "1 ora fa",  type: "rate"     },
  { id: "a5", user: { name: "Giulia", avatar: "https://i.pravatar.cc/150?img=25" }, action: "ha recensito",     media: "Mitski — Laurel Hell",   time: "2 ore fa",  type: "review"   },
  { id: "a6", user: { name: "Andrea", avatar: "https://i.pravatar.cc/150?img=60" }, action: "ha completato",    media: "Tomorrow, and Tomorrow", time: "4 ore fa",  type: "complete"  },
];

// ──────────────────────────── MOCK_LISTS ────────────────────────────
export const MOCK_LISTS: ListItem[] = [
  {
    id: "l1", title: "Film che mi hanno cambiato",
    author: { name: "Elena Russo", avatar: "https://i.pravatar.cc/150?img=47" },
    coverImages: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=200&h=300&fit=crop",
    ],
    itemCount: 23, likes: 184,
    description: "Non film che mi sono piaciuti di più — film che hanno spostato qualcosa.",
    tags: ["personale", "cinema", "formativo"], isPublic: true,
  },
  {
    id: "l2", title: "Serie da finire prima di morire",
    author: { name: "Marco Ferri", avatar: "https://i.pravatar.cc/150?img=12" },
    coverImages: [
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512427626839-fbed5e12a9d4?w=200&h=300&fit=crop",
    ],
    itemCount: 12, likes: 97,
    description: "Quelle che ogni volta rimando e poi mi pento.",
    tags: ["serie", "watchlist", "must-see"], isPublic: true,
  },
  {
    id: "l3", title: "Libri per sentirsi meno soli",
    author: { name: "Sofia Gallo", avatar: "https://i.pravatar.cc/150?img=31" },
    coverImages: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=200&h=300&fit=crop",
    ],
    itemCount: 18, likes: 231,
    description: "Narrativa contemporanea che parla di connessione, distanza, solitudine.",
    tags: ["letteratura", "emotivo", "contemporaneo"], isPublic: true,
  },
  {
    id: "l4", title: "Musica da ascoltare da soli in macchina",
    author: { name: "Luca Bianchi", avatar: "https://i.pravatar.cc/150?img=8" },
    coverImages: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=300&fit=crop",
    ],
    itemCount: 34, likes: 418,
    description: "La colonna sonora dei viaggi notturni.",
    tags: ["musica", "viaggio", "notturna"], isPublic: true,
  },
  {
    id: "l5", title: "A24 — tutto in ordine di preferenza",
    author: { name: "Giulia Esposito", avatar: "https://i.pravatar.cc/150?img=25" },
    coverImages: [
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=300&fit=crop",
    ],
    itemCount: 41, likes: 672,
    description: "Ho visto ogni film A24 prodotto. Questa è la classifica definitiva.",
    tags: ["a24", "cinema", "ranking"], isPublic: true,
  },
  {
    id: "l6", title: "Anime che vale davvero la pena",
    author: { name: "Andrea Colombo", avatar: "https://i.pravatar.cc/150?img=60" },
    coverImages: [
      "https://images.unsplash.com/photo-1541562232579-512a21360020?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=300&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=300&fit=crop",
    ],
    itemCount: 27, likes: 309,
    description: "Solo quelli che consiglierei anche a chi dice 'non mi piacciono gli anime'.",
    tags: ["anime", "curato", "gateway"], isPublic: true,
  },
];

// ──────────────────────────── MOCK_PROFILE v2 ────────────────────────────

export const PROFILE_LOG: ProfileLogItem[] = [
  // Film
  { id: "log-1",  mediaType: "film",  title: "Past Lives",              cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop", rating: 5, loggedAt: "2 giorni fa",  status: "completato", review: "Devastante nei silenzi.",        tags: ["dramma", "A24"] },
  { id: "log-2",  mediaType: "film",  title: "Everything Everywhere",   cover: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop", rating: 5, loggedAt: "5 giorni fa",  status: "completato", review: "Caos e amore.",                  tags: ["sci-fi", "A24"] },
  { id: "log-3",  mediaType: "film",  title: "Aftersun",                 cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: 5, loggedAt: "2 sett. fa",  status: "completato", review: "Non si riesce a smettere di pensarci.", tags: ["dramma", "memoria"] },
  { id: "log-4",  mediaType: "film",  title: "Annihilation",             cover: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&h=450&fit=crop", rating: 4, loggedAt: "3 sett. fa",  status: "completato",                                              tags: ["sci-fi", "horror"] },
  { id: "log-5",  mediaType: "film",  title: "Midsommar",                cover: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=300&h=450&fit=crop", rating: 4, loggedAt: "1 mese fa",   status: "completato",                                              tags: ["horror", "A24"] },
  // Serie
  { id: "log-6",  mediaType: "serie", title: "Severance S2",             cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop", rating: 5, loggedAt: "3 giorni fa", status: "completato", review: "Migliore della prima.",          tags: ["thriller", "workplace"] },
  { id: "log-7",  mediaType: "serie", title: "The Bear S3",              cover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=450&fit=crop", rating: 4, loggedAt: "1 sett. fa",  status: "completato",                                              tags: ["dramma", "food"] },
  { id: "log-8",  mediaType: "serie", title: "Succession",               cover: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&h=450&fit=crop", rating: 5, loggedAt: "2 mesi fa",  status: "completato", review: "Il finale è perfetto.",         tags: ["dramma", "satira"] },
  { id: "log-9",  mediaType: "serie", title: "Dark S1",                  cover: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=450&fit=crop", rating: 5, loggedAt: "4 mesi fa",  status: "completato",                                              tags: ["sci-fi", "tedesca"] },
  // Libri
  { id: "log-10", mediaType: "libro", title: "Normal People",            cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop", rating: 4, loggedAt: "1 sett. fa",  status: "completato", review: "Fa malissimo.",                tags: ["narrativa", "relazioni"] },
  { id: "log-11", mediaType: "libro", title: "La strada",                cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=450&fit=crop", rating: 5, loggedAt: "3 sett. fa",  status: "completato", review: "McCarthy al massimo.",          tags: ["post-apocalittico", "padri"] },
  { id: "log-12", mediaType: "libro", title: "Kafka sulla spiaggia",     cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop", rating: 4, loggedAt: "2 mesi fa",  status: "completato",                                              tags: ["murakami", "surreale"] },
  { id: "log-13", mediaType: "libro", title: "Il problema dei tre corpi",cover: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop", rating: 4, loggedAt: "4 mesi fa",  status: "completato",                                              tags: ["sci-fi hard", "cina"] },
  { id: "log-14", mediaType: "libro", title: "Piranesi",                  cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop", rating: 5, loggedAt: "5 mesi fa",  status: "completato", review: "Unico nel suo genere.",        tags: ["fantasy", "mistero"] },
  // Giochi
  { id: "log-15", mediaType: "gioco", title: "Hollow Knight",            cover: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=450&fit=crop", rating: 5, loggedAt: "6 giorni fa", status: "completato", review: "Capolavoro indie.",             tags: ["metroidvania", "indie"] },
  { id: "log-16", mediaType: "gioco", title: "Disco Elysium",             cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=450&fit=crop", rating: 5, loggedAt: "1 mese fa",  status: "completato", review: "Il miglior gioco di ruolo.",  tags: ["RPG", "narrativo"] },
  { id: "log-17", mediaType: "gioco", title: "Inside",                    cover: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=450&fit=crop", rating: 5, loggedAt: "2 mesi fa",  status: "completato",                                              tags: ["puzzle", "distopico"] },
  { id: "log-18", mediaType: "gioco", title: "Celeste",                   cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=450&fit=crop", rating: 5, loggedAt: "3 mesi fa",  status: "completato",                                              tags: ["platformer", "salute mentale"] },
  { id: "log-19", mediaType: "gioco", title: "Outer Wilds",               cover: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=450&fit=crop", rating: 5, loggedAt: "5 mesi fa",  status: "completato", review: "Cambia il modo di vedere i giochi.", tags: ["esplorazione", "mistero"] },
  { id: "log-20", mediaType: "gioco", title: "Elden Ring",                cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=450&fit=crop", rating: 4, loggedAt: "6 mesi fa",  status: "completato",                                              tags: ["soulslike", "open world"] },
];

export const PROFILE_TIMELINE: TimelineEvent[] = [
  { id: "t1",  mediaType: "film",  action: "completato",       title: "Past Lives",              cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop", rating: 5,        date: "2 giorni fa" },
  { id: "t2",  mediaType: "gioco", action: "recensito",        title: "Hollow Knight",           cover: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=450&fit=crop", excerpt: "Capolavoro indie assoluto. Il boss finale mi ha distrutto, letteralmente.", date: "3 giorni fa" },
  { id: "t3",  mediaType: "serie", action: "completato",       title: "Severance S2",            cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop", rating: 5,        date: "4 giorni fa" },
  { id: "t4",  mediaType: "libro", action: "recensito",        title: "Normal People",           cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop", excerpt: "Fa malissimo nel modo giusto.", date: "5 giorni fa" },
  { id: "t5",  mediaType: "film",  action: "aggiunto a lista", title: "Aftersun",                cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",             date: "6 giorni fa" },
  { id: "t6",  mediaType: "gioco", action: "completato",       title: "Disco Elysium",           cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=450&fit=crop", rating: 5,        date: "1 sett. fa" },
  { id: "t7",  mediaType: "libro", action: "iniziato",         title: "La strada",               cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=450&fit=crop",             date: "1 sett. fa" },
  { id: "t8",  mediaType: "serie", action: "aggiunto a lista", title: "The Bear S3",             cover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=450&fit=crop",             date: "2 sett. fa" },
  { id: "t9",  mediaType: "gioco", action: "salvato",          title: "Celeste",                 cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=450&fit=crop",             date: "3 sett. fa" },
  { id: "t10", mediaType: "film",  action: "recensito",        title: "Everything Everywhere",  cover: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop", excerpt: "Caos e amore. Non dovrebbe funzionare e invece...", date: "1 mese fa" },
];

export const MOCK_PROFILE = {
  username: "ryuzakxx",
  name: "Francesco M.",
  bio: "Cerco storie che lascino qualcosa. Sviluppatore di giorno, cinefilo di notte. Giochi narrativi, horror, dramma indie.",
  avatar: "https://i.pravatar.cc/150?img=57",
  banner: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&h=400&fit=crop",
  location: "Taranto, IT",
  joinedYear: 2023,
  stats: {
    logged:    312,
    reviews:   87,
    lists:     14,
    followers: 430,
    following: 218,
    film:      98,
    serie:     74,
    libri:     61,
    giochi:    79,
  },
  tasteFingerprint: [
    { label: "Dramma",     value: 82, color: "#c48072" },
    { label: "Sci-Fi",     value: 74, color: "#7eb8c9" },
    { label: "Indie",      value: 68, color: "#a3d977" },
    { label: "Horror",     value: 61, color: "#d163a7" },
    { label: "Animazione", value: 55, color: "#ead4a4" },
  ],
  // favoriti espliciti (1 per categoria)
  favorites: {
    film:  { title: "Aftersun",      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", year: 2022 },
    serie: { title: "Severance",     cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop", year: 2022 },
    libro: { title: "Piranesi",      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop", year: 2021 },
    gioco: { title: "Outer Wilds",   cover: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=450&fit=crop", year: 2019 },
  },
  topGenres: ["Dramma", "Sci-Fi", "Indie Rock", "Horror", "Animazione", "Metroidvania", "Narrativa"],
  compatibleUsers: [
    { name: "Elena",  handle: "elenarusso",    avatar: "https://i.pravatar.cc/150?img=47", compat: 92 },
    { name: "Sofia",  handle: "sofiagallo",    avatar: "https://i.pravatar.cc/150?img=31", compat: 87 },
    { name: "Giulia", handle: "giuliaesposito", avatar: "https://i.pravatar.cc/150?img=25", compat: 81 },
  ],
};
