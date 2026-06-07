import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppProviders } from "@/providers/AppProviders";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Sonder",
  description: "A cultural identity network for tracking media, reviews, lists and taste compatibility."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
