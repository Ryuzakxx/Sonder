import type { ImageAsset } from "@/types/media";

export type ProfileStat = {
  label: string;
  value: number;
};

export type ProfileModule = {
  id: string;
  title: string;
  kind: "covers" | "stats" | "reading" | "quote";
  text?: string;
  covers?: ImageAsset[];
  stats?: ProfileStat[];
};

export type UserProfile = {
  name: string;
  handle: string;
  location: string;
  bio: string;
  affinityScore: number;
  avatar: ImageAsset;
  banner: ImageAsset;
  modules: ProfileModule[];
};
