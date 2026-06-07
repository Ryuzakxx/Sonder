import { Panel, SectionHeader } from "@/components/ui";
import type { FeaturedCollection } from "../types/list";
import { CollectionCard } from "./CollectionCard";

type CollectionSectionProps = {
  collections: FeaturedCollection[];
};

export function CollectionSection({ collections }: CollectionSectionProps) {
  return (
    <Panel id="liste">
      <SectionHeader
        description="Classifiche, recap annuali e collezioni emotive curate per essere condivise."
        title="Liste come moodboard"
      />
      <div className="collections">
        {collections.map((collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
    </Panel>
  );
}
