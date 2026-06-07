import Image from "next/image";
import type { FeaturedCollection } from "../types/list";

type CollectionCardProps = {
  collection: FeaturedCollection;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <article className="collection-card">
      <div className="mood-grid">
        {collection.artworks.map((artwork) => (
          <div className="poster" key={artwork.src}>
            <Image alt={artwork.alt} height={150} src={artwork.src} width={150} />
          </div>
        ))}
      </div>
      <strong>{collection.title}</strong>
      <p className="time">{collection.meta}</p>
    </article>
  );
}
