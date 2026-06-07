import Image from "next/image";
import type { UserProfile } from "../types/profile";
import { formatProfileHandle } from "../utils/profileFormatters";
import { ProfileModulesGrid } from "./ProfileModulesGrid";

type ProfileIdentityCardProps = {
  profile: UserProfile;
};

export function ProfileIdentityCard({ profile }: ProfileIdentityCardProps) {
  return (
    <article className="identity-card" aria-label="Anteprima profilo utente">
      <div className="banner">
        <Image alt={profile.banner.alt} fill priority sizes="(max-width: 760px) 100vw, 640px" src={profile.banner.src} />
      </div>
      <div className="identity-main">
        <div className="avatar">
          <Image alt={profile.avatar.alt} height={76} src={profile.avatar.src} width={76} />
        </div>
        <div>
          <h2>{profile.name}</h2>
          <div className="handle">{formatProfileHandle(profile.handle, profile.location)}</div>
        </div>
        <div className="score-ring">{profile.affinityScore}%</div>
      </div>
      <ProfileModulesGrid modules={profile.modules} />
    </article>
  );
}
