import type { TasteCompatibility } from "../types/compatibility";

export async function getTasteCompatibility(): Promise<TasteCompatibility> {
  return {
    userA: "Lea",
    userB: "Nika",
    score: 92,
    sharedFilms: 14,
    sharedAlbums: 8,
    sharedGames: 5
  };
}
