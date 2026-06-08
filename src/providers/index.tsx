"use client";
import { AuthProvider } from "./AuthProvider";
import { SearchProvider } from "./SearchProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </AuthProvider>
  );
}
