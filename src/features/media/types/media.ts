import type { ImageAsset, MediaCategory } from "@/types/media";

export type FeaturedMedia = {
  id: string;
  title: string;
  category: MediaCategory;
  year: number;
  genre: string;
  description: string;
  poster: ImageAsset;
  backdrop: ImageAsset;
  ratingDistribution: number[];
};
