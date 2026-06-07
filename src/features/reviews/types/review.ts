import type { MediaCategory } from "@/types/media";

export type Review = {
  id: string;
  mediaId: string;
  mediaCategory: MediaCategory;
  authorId: string;
  rating: number;
  body: string;
};
