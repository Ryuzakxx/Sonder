import Link from "next/link";
import { Button } from "@/components/ui";
import { navigationItems } from "@/constants/navigation";

export function TopNavigation() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">S</span>
        <span>Sonder</span>
      </Link>
      <nav className="nav" aria-label="Navigazione principale">
        {navigationItems.map((item, index) => (
          <Link className={index === 0 ? "active" : undefined} href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="top-actions">
        <Button aria-label="Notifiche" variant="icon">
          ~
        </Button>
        <Button variant="primary">Nuovo log</Button>
      </div>
    </header>
  );
}
