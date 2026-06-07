import { NextRequest, NextResponse } from "next/server";
import { getMovieDetail, getTVDetail } from "@/services/tmdb";
import { getBookDetail } from "@/services/books";

type Params = { type: string; id: string };

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { type, id } = await params;
  const tmdbKey  = process.env.TMDB_API_KEY ?? "";
  const booksKey = process.env.GOOGLE_BOOKS_API_KEY;

  try {
    if (type === "film") {
      if (!tmdbKey) return NextResponse.json({ error: "TMDB_API_KEY mancante" }, { status: 500 });
      const data = await getMovieDetail(id, tmdbKey);
      return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } });
    }
    if (type === "serie") {
      if (!tmdbKey) return NextResponse.json({ error: "TMDB_API_KEY mancante" }, { status: 500 });
      const data = await getTVDetail(id, tmdbKey);
      return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } });
    }
    if (type === "libro") {
      const data = await getBookDetail(id, booksKey);
      return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } });
    }
    return NextResponse.json({ error: `Tipo non supportato: ${type}` }, { status: 400 });
  } catch (err) {
    console.error(`[media/${type}/${id}]`, err);
    return NextResponse.json({ error: "Errore nel recupero dati" }, { status: 502 });
  }
}
