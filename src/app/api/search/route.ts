import { NextRequest, NextResponse } from "next/server";
import { universalSearch } from "@/services/search";
import type { SearchCategory } from "@/services/search";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query    = searchParams.get("q")?.trim() ?? "";
  const category = (searchParams.get("type") ?? "tutto") as SearchCategory;

  if (!query || query.length < 2) {
    return NextResponse.json({ film: [], serie: [], libri: [] });
  }

  const tmdbKey  = process.env.TMDB_API_KEY ?? "";
  const booksKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!tmdbKey) {
    return NextResponse.json(
      { error: "TMDB_API_KEY non configurata" },
      { status: 500 }
    );
  }

  try {
    const results = await universalSearch(query, category, tmdbKey, booksKey);
    return NextResponse.json(results, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (err) {
    console.error("[search] errore:", err);
    return NextResponse.json({ error: "Errore durante la ricerca" }, { status: 500 });
  }
}
