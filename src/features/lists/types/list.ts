import type { ImageAsset } from "@/types/media";

export type FeaturedCollection = {
  id: string;
  title: string;
  meta: string;
  artworks: ImageAsset[];
};
