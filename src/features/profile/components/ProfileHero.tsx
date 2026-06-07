import type { UserProfile } from "../types/profile";
import { ProfileIdentityCard } from "./ProfileIdentityCard";

type ProfileHeroProps = {
  profile: UserProfile;
};

export function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <section className="hero" id="profilo" aria-labelledby="hero-title">
      <div className="hero-content">
        <span className="eyebrow">Identita culturale digitale</span>
        <h1 id="hero-title">Il profilo dove film, libri, musica e giochi diventano personalita.</h1>
        <p className="hero-copy">{profile.bio}</p>
        <div className="hero-actions">
          <a className="pill-button primary" href="#feed">Esplora il feed</a>
          <a className="pill-button ghost" href="#media">Apri una pagina media</a>
        </div>
      </div>
      <div className="profile-preview">
        <ProfileIdentityCard profile={profile} />
      </div>
    </section>
  );
}
