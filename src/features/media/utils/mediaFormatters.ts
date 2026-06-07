import type { FeaturedMedia } from "../types/media";

export function formatMediaMeta(media: FeaturedMedia) {
  return `${media.category} - ${media.genre} - ${media.year}`;
}
