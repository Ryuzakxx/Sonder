import { Panel } from "@/components/ui";
import type { UserProfile } from "@/features/profile";

type CompatibilityCardProps = {
  profile: UserProfile;
};

export function CompatibilityCard({ profile }: CompatibilityCardProps) {
  return (
    <Panel>
      <div className="compat-card">
        <div className="compat-top">
          <div className="compat-ring">92%</div>
          <div>
            <span className="mini-label">Compatibilita gusti</span>
            <h2>{profile.name.split(" ")[0]} + Nika</h2>
            <p className="review-text">
              Voti simili su cinema lento, RPG narrativi e album dream pop. Sonder suggerisce media comuni e scoperte condivise.
            </p>
          </div>
        </div>
        <div className="overlap-list">
          <div className="overlap"><strong>14</strong><span className="time">film in comune</span></div>
          <div className="overlap"><strong>8</strong><span className="time">album allineati</span></div>
          <div className="overlap"><strong>5</strong><span className="time">giochi amati</span></div>
        </div>
      </div>
    </Panel>
  );
}
