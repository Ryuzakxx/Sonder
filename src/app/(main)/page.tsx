import { AppShell } from "@/components/layout";
import { CompatibilityCard } from "@/features/compatibility";
import { CollectionSection, getFeaturedCollections } from "@/features/lists";
import { MediaShowcase, getFeaturedMedia } from "@/features/media";
import { ProfileHero, getProfile } from "@/features/profile";
import { UniversalSearch, getSearchIndex } from "@/features/search";
import { FeedSection, TimelineSection, getFeedItems, getTimelineItems } from "@/features/social";

export default async function HomePage() {
  const [profile, feedItems, searchItems, featuredMedia, collections, timelineItems] = await Promise.all([
    getProfile(),
    getFeedItems(),
    getSearchIndex(),
    getFeaturedMedia(),
    getFeaturedCollections(),
    getTimelineItems()
  ]);

  return (
    <AppShell>
      <ProfileHero profile={profile} />
      <div className="main-grid">
        <div className="content-stack">
          <FeedSection items={feedItems} />
          <MediaShowcase media={featuredMedia} />
          <CollectionSection collections={collections} />
        </div>
        <aside className="sidebar-stack">
          <UniversalSearch items={searchItems} />
          <CompatibilityCard profile={profile} />
          <TimelineSection items={timelineItems} />
        </aside>
      </div>
    </AppShell>
  );
}
