import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/AuthProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Sonder", template: "%s — Sonder" },
  description: "Il tuo diario culturale. Film, serie, libri, musica e giochi in un unico luogo.",
  openGraph: {
    siteName: "Sonder",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            richColors
            toastOptions={{ style: { background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#f5f5f5" } }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
