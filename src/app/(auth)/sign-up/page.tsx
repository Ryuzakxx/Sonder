import type { Metadata } from "next";
import { SignUpForm } from "@/features/auth/SignUpForm";

export const metadata: Metadata = { title: "Registrati" };

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Sonder</h1>
          <p className="text-[#666] text-sm">Crea il tuo profilo culturale</p>
        </div>
        <SignUpForm />
        <p className="text-center text-sm text-[#555] mt-6">
          Hai già un account?{" "}
          <a href="/sign-in" className="text-[#c8a97e] hover:text-[#e8c99e] transition-colors">Accedi</a>
        </p>
      </div>
    </main>
  );
}
