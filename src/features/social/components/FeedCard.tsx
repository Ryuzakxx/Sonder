import Image from "next/image";
import { Badge } from "@/components/ui";
import type { FeedItem } from "../types/social";

type FeedCardProps = {
  item: FeedItem;
};

export function FeedCard({ item }: FeedCardProps) {
  return (
    <article className="feed-card">
      <div className="poster">
        <Image alt={item.artwork.alt} height={174} src={item.artwork.src} width={116} />
      </div>
      <div>
        <div className="feed-head">
          <div className="person">
            <span className="tiny-avatar">
              <Image alt={item.actor.avatar.alt} height={34} src={item.actor.avatar.src} width={34} />
            </span>
            <div>
              <strong>{item.actor.name}</strong>
              <span className="time">{item.action}</span>
            </div>
          </div>
          <span className="rating">{item.rating}</span>
        </div>
        <div className="review-title">{item.mediaTitle}</div>
        <p className="review-text">{item.text}</p>
        <div className="reaction-row">
          {item.reactions.map((reaction) => (
            <Badge key={reaction}>{reaction}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
