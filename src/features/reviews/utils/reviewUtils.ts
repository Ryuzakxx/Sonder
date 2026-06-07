export function clampRating(rating: number) {
  return Math.max(0, Math.min(5, rating));
}
