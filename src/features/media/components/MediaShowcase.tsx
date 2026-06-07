import Image from "next/image";
import type { FeaturedMedia } from "../types/media";
import { MediaActions } from "./MediaActions";
import { RatingDistribution } from "./RatingDistribution";

type MediaShowcaseProps = {
  media: FeaturedMedia;
};

export function MediaShowcase({ media }: MediaShowcaseProps) {
  return (
    <section className="media-hero" id="media" aria-labelledby="media-title">
      <Image alt={media.backdrop.alt} className="media-backdrop" fill sizes="100vw" src={media.backdrop.src} />
      <div className="media-inner">
        <div className="media-poster">
          <Image alt={media.poster.alt} height={315} src={media.poster.src} width={210} />
        </div>
        <div className="media-copy">
          <span className="eyebrow">
            {media.category} - {media.genre} - {media.year}
          </span>
          <h2 id="media-title">{media.title}</h2>
          <p>{media.description}</p>
          <MediaActions />
          <RatingDistribution values={media.ratingDistribution} />
        </div>
      </div>
    </section>
  );
}
