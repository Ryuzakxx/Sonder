import type { ReactNode } from "react";
import { TopNavigation } from "./TopNavigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <TopNavigation />
      <main>{children}</main>
    </div>
  );
}
