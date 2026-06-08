import type { Metadata } from "next";
import { tmdbService } from "@/services/tmdb.service";
import { booksService } from "@/services/books.service";
import { MediaDetailClient } from "@/features/media/MediaDetailClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ type: string; id: string }> }): Promise<Metadata> {
  const { type, id } = await params;
  try {
    if (type === "film") {
      const data = await tmdbService.getMovie(id);
      return { title: data.title ?? "Film" };
    } else if (type === "serie") {
      const data = await tmdbService.getTV(id);
      return { title: data.name ?? "Serie" };
    } else if (type === "libro") {
      const data = await booksService.getVolume(id);
      return { title: data.volumeInfo?.title ?? "Libro" };
    }
  } catch {}
  return { title: "Media" };
}

export default async function MediaPage({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await params;

  try {
    if (type === "film") {
      const data = await tmdbService.getMovie(id);
      if (!data.id) notFound();
      return <MediaDetailClient type="film" data={data} />;
    } else if (type === "serie") {
      const data = await tmdbService.getTV(id);
      if (!data.id) notFound();
      return <MediaDetailClient type="serie" data={data} />;
    } else if (type === "libro") {
      const data = await booksService.getVolume(id);
      if (!data.id) notFound();
      return <MediaDetailClient type="libro" data={data} />;
    }
    notFound();
  } catch {
    notFound();
  }
}
