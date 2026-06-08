/**
 * Zero-dependency Supabase client using native fetch + REST API.
 * Falls back gracefully when env vars are missing or DB is not set up.
 */

const SUPABASE_URL = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_URL) ?? "";
const SUPABASE_ANON_KEY = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ?? "";

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// ─── Token storage ────────────────────────────────────────────────────────────
let _accessToken: string | null = null;
let _refreshToken: string | null = null;
let _expiresAt: number | null = null;

function saveSession(access: string, refresh: string, expiresIn: number) {
  _accessToken = access;
  _refreshToken = refresh;
  _expiresAt = Date.now() + expiresIn * 1000;
  if (typeof window !== "undefined") {
    try { sessionStorage.setItem("sonder_access", access); sessionStorage.setItem("sonder_refresh", refresh); sessionStorage.setItem("sonder_expires", String(_expiresAt)); } catch {}
  }
}

function loadSession() {
  if (_accessToken) return;
  if (typeof window === "undefined") return;
  try { _accessToken = sessionStorage.getItem("sonder_access"); _refreshToken = sessionStorage.getItem("sonder_refresh"); _expiresAt = Number(sessionStorage.getItem("sonder_expires")) || null; } catch {}
}

function clearSession() {
  _accessToken = null; _refreshToken = null; _expiresAt = null;
  if (typeof window !== "undefined") { try { sessionStorage.removeItem("sonder_access"); sessionStorage.removeItem("sonder_refresh"); sessionStorage.removeItem("sonder_expires"); } catch {} }
}

async function getValidToken(): Promise<string | null> {
  loadSession();
  if (!_accessToken) return null;
  if (_expiresAt && Date.now() > _expiresAt - 60_000 && _refreshToken) await supabase.auth.refreshSession();
  return _accessToken;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
async function authFetch(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description ?? data.msg ?? "Auth error");
  return data;
}

// ─── DB ───────────────────────────────────────────────────────────────────────
async function dbFetch(table: string, params: Record<string, string> = {}, options: { method?: string; body?: unknown } = {}) {
  if (!isConfigured) return options.method && options.method !== "GET" ? null : [];
  const token = await getValidToken();
  const qs = new URLSearchParams(params).toString();
  const url = `${SUPABASE_URL}/rest/v1/${table}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${token ?? SUPABASE_ANON_KEY}`, "Content-Type": "application/json", "Prefer": "return=representation" },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });
  if (!res.ok) {
    // Don't throw — return empty so callers don't crash
    return options.method && options.method !== "GET" ? null : [];
  }
  if (res.status === 204) return null;
  return res.json();
}

// ─── Public client ────────────────────────────────────────────────────────────
export const supabase = {
  auth: {
    async signUp(email: string, password: string, meta?: Record<string, unknown>) {
      if (!isConfigured) throw new Error("Supabase non configurato. Aggiungi NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
      const data = await authFetch("/signup", { email, password, data: meta ?? {} });
      if (data.access_token) saveSession(data.access_token, data.refresh_token, data.expires_in);
      return { user: data.user ?? null, session: data.access_token ? data : null };
    },
    async signIn(email: string, password: string) {
      if (!isConfigured) throw new Error("Supabase non configurato.");
      const data = await authFetch("/token?grant_type=password", { email, password });
      saveSession(data.access_token, data.refresh_token, data.expires_in);
      return { user: data.user, session: data };
    },
    async signOut() {
      const token = await getValidToken();
      if (token && isConfigured) {
        await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
          method: "POST",
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${token}` },
        }).catch(() => {});
      }
      clearSession();
    },
    async getSession() {
      loadSession();
      if (!_accessToken) return null;
      return { access_token: _accessToken, refresh_token: _refreshToken };
    },
    async getUser() {
      const token = await getValidToken();
      if (!token || !isConfigured) return null;
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) { clearSession(); return null; }
      return res.json();
    },
    async refreshSession() {
      if (!_refreshToken || !isConfigured) return;
      try {
        const data = await authFetch("/token?grant_type=refresh_token", { refresh_token: _refreshToken });
        saveSession(data.access_token, data.refresh_token, data.expires_in);
      } catch { clearSession(); }
    },
  },

  from(table: string) {
    return {
      select(columns = "*") {
        const params: Record<string, string> = { select: columns };
        const chain = {
          eq(col: string, val: string | number) { params[col] = `eq.${val}`; return chain; },
          order(col: string, opts?: { ascending?: boolean }) { params.order = `${col}.${opts?.ascending === false ? "desc" : "asc"}`; return chain; },
          limit(n: number) { params.limit = String(n); return chain; },
          single() { params.limit = "1"; return { then: (r: (v: unknown) => unknown) => dbFetch(table, params).then((d) => r(Array.isArray(d) ? d[0] ?? null : d)) }; },
          then(resolve: (v: unknown) => unknown) { return dbFetch(table, params).then(resolve); },
        };
        return chain;
      },
      insert(body: unknown) { return dbFetch(table, {}, { method: "POST", body }); },
      upsert(body: unknown) {
        const chain = {
          select() { return chain; },
          single() { return { then: (r: (v: unknown) => unknown) => dbFetch(table, {}, { method: "POST", body }).then(r) }; },
          then(resolve: (v: unknown) => unknown) { return dbFetch(table, {}, { method: "POST", body }).then(resolve); },
        };
        return chain;
      },
      update(body: unknown) {
        const params: Record<string, string> = {};
        const chain = {
          eq(col: string, val: string | number) { params[col] = `eq.${val}`; return chain; },
          then(resolve: (v: unknown) => unknown) { return dbFetch(table, params, { method: "PATCH", body }).then(resolve); },
        };
        return chain;
      },
      delete() {
        const params: Record<string, string> = {};
        const chain = {
          eq(col: string, val: string | number) { params[col] = `eq.${val}`; return chain; },
          then(resolve: (v: unknown) => unknown) { return dbFetch(table, params, { method: "DELETE" }).then(resolve); },
        };
        return chain;
      },
    };
  },
};

export function createClient() { return supabase; }
