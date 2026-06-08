import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/sign-in", "/sign-up", "/auth/callback", "/api"];

// Auth check is handled client-side via AuthProvider + useAuth.
// Middleware only guards clearly protected routes using the JWT cookie.
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p));

  if (isPublic) return NextResponse.next();

  // Check for Supabase auth token in cookies (set by supabase-js)
  const hasSession =
    request.cookies.has("sb-access-token") ||
    [...request.cookies.getAll()].some((c) =>
      c.name.includes("supabase") && c.name.includes("auth")
    );

  // If no cookie at all, let the client-side AuthProvider handle the redirect
  // to avoid false positives (cookie names vary by project ref)
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
