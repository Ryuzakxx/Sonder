export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          bio: string | null;
          website: string | null;
          followers_count: number;
          following_count: number;
          reviews_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          bio?: string | null;
          website?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          media_type: "film" | "serie" | "libro" | "musica" | "gioco";
          media_id: string;
          media_title: string;
          media_cover: string | null;
          rating: number;
          body: string | null;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          media_type: "film" | "serie" | "libro" | "musica" | "gioco";
          media_id: string;
          media_title: string;
          media_cover?: string | null;
          rating: number;
          body?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          media_type: string | null;
          media_id: string | null;
          media_title: string | null;
          media_cover: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          action: string;
          media_type?: string | null;
          media_id?: string | null;
          media_title?: string | null;
          media_cover?: string | null;
          metadata?: Json | null;
        };
        Update: never;
      };
      follows: {
        Row: { follower_id: string; following_id: string; created_at: string };
        Insert: { follower_id: string; following_id: string };
        Update: never;
      };
      likes: {
        Row: { user_id: string; review_id: string; created_at: string };
        Insert: { user_id: string; review_id: string };
        Update: never;
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          media_type: string;
          media_id: string;
          media_title: string;
          media_cover: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          media_type: string;
          media_id: string;
          media_title: string;
          media_cover?: string | null;
        };
        Update: never;
      };
      lists: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          is_public: boolean;
          cover_url: string | null;
          items_count: number;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          description?: string | null;
          is_public?: boolean;
          cover_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["lists"]["Insert"]>;
      };
      list_items: {
        Row: {
          id: string;
          list_id: string;
          media_type: string;
          media_id: string;
          media_title: string;
          media_cover: string | null;
          note: string | null;
          position: number;
          created_at: string;
        };
        Insert: {
          list_id: string;
          media_type: string;
          media_id: string;
          media_title: string;
          media_cover?: string | null;
          note?: string | null;
          position?: number;
        };
        Update: never;
      };
      ratings: {
        Row: {
          id: string;
          user_id: string;
          media_type: string;
          media_id: string;
          value: number;
          created_at: string;
          updated_at: string;
        };
        Insert: { user_id: string; media_type: string; media_id: string; value: number };
        Update: { value?: number };
      };
    };
  };
}
