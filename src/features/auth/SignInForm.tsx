"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signIn(email, password);
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Errore di accesso";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-[#888] mb-1.5 uppercase tracking-wider">Email</label>
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)} required
          className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#c8a97e] transition-colors text-sm"
          placeholder="tu@email.com"
        />
      </div>
      <div>
        <label className="block text-xs text-[#888] mb-1.5 uppercase tracking-wider">Password</label>
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)} required
          className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#c8a97e] transition-colors text-sm"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit" disabled={loading}
        className="w-full bg-[#c8a97e] hover:bg-[#e8c99e] disabled:opacity-50 text-[#0d0d0d] font-semibold py-3 rounded-lg transition-colors text-sm mt-2"
      >
        {loading ? "Accesso..." : "Accedi"}
      </button>
    </form>
  );
}
