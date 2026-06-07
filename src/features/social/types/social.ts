import type { ImageAsset, MediaCategory } from "@/types/media";

export type FeedItem = {
  id: string;
  actor: {
    name: string;
    avatar: ImageAsset;
  };
  action: string;
  mediaTitle: string;
  category: MediaCategory;
  rating: string;
  text: string;
  artwork: ImageAsset;
  reactions: string[];
};

export type TimelineItem = {
  id: string;
  label: string;
  time: string;
};
