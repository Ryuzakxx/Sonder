export type MediaType = "film" | "serie" | "libro" | "musica" | "gioco";

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  followers_count: number;
  following_count: number;
  reviews_count: number;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  media_type: MediaType;
  media_id: string;
  media_title: string;
  media_cover: string | null;
  rating: number;
  body: string | null;
  likes_count: number;
  created_at: string;
  profile?: Profile;
}

export interface Activity {
  id: string;
  user_id: string;
  action: string;
  media_type: string | null;
  media_title: string | null;
  media_cover: string | null;
  created_at: string;
  profile?: Profile;
}

export interface MediaSearchResult {
  id: string;
  type: MediaType;
  title: string;
  year: string;
  cover: string | null;
  description?: string;
  rating?: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
}

export interface TMDBShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
}

export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
    averageRating?: number;
    ratingsCount?: number;
    pageCount?: number;
    categories?: string[];
  };
}
