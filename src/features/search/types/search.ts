import type { ImageAsset, MediaCategory } from "@/types/media";

export type SearchItem = {
  id: string;
  title: string;
  category: MediaCategory;
  meta: string;
  artwork: ImageAsset;
};

export type SearchFilter = "all" | MediaCategory;
