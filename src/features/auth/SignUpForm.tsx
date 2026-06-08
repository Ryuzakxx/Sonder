"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.length < 3) { toast.error("Username troppo corto (min 3 caratteri)"); return; }
    setLoading(true);
    try {
      await authService.signUp(email, password, username);
      toast.success("Account creato! Controlla la tua email.");
      router.push("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Errore di registrazione";
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
        <label className="block text-xs text-[#888] mb-1.5 uppercase tracking-wider">Username</label>
        <input
          type="text" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} required
          className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#c8a97e] transition-colors text-sm"
          placeholder="il_tuo_username"
        />
      </div>
      <div>
        <label className="block text-xs text-[#888] mb-1.5 uppercase tracking-wider">Password</label>
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
          className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-[#c8a97e] transition-colors text-sm"
          placeholder="min 6 caratteri"
        />
      </div>
      <button
        type="submit" disabled={loading}
        className="w-full bg-[#c8a97e] hover:bg-[#e8c99e] disabled:opacity-50 text-[#0d0d0d] font-semibold py-3 rounded-lg transition-colors text-sm mt-2"
      >
        {loading ? "Creazione..." : "Crea account"}
      </button>
    </form>
  );
}
