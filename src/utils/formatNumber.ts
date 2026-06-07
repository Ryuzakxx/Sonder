export function formatNumber(value: number) {
  return new Intl.NumberFormat("it-IT", {
    notation: value > 9999 ? "compact" : "standard"
  }).format(value);
}
