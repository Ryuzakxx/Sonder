"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { navigationItems } from "@/constants/navigation";

export function TopNavigation() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">S</span>
        <span>Sonder</span>
      </Link>
      <nav className="nav" aria-label="Navigazione principale">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              className={isActive ? "active" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="top-actions">
        <Button aria-label="Notifiche" variant="icon">
          🔔
        </Button>
        <Button variant="primary">Nuovo log</Button>
      </div>
    </header>
  );
}
