import { Button, Panel } from "@/components/ui";

export function AuthCard() {
  return (
    <Panel className="auth-card">
      <span className="eyebrow">Accesso privato</span>
      <h1>Entra nel tuo archivio culturale.</h1>
      <p className="hero-copy">Autenticazione separata dalla UI pubblica, pronta per provider esterni e sessioni server-side.</p>
      <Button variant="primary">Continua</Button>
    </Panel>
  );
}
