export function getCompatibilityTone(score: number) {
  if (score >= 85) {
    return "high";
  }

  if (score >= 60) {
    return "medium";
  }

  return "low";
}
