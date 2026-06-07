type StarRatingProps = {
  value: number;
  max?: number;
  size?: "sm" | "md";
};

export function StarRating({ value, max = 5, size = "md" }: StarRatingProps) {
  const fontSize = size === "sm" ? "13px" : "16px";
  return (
    <span style={{ color: "var(--gold)", fontSize, fontWeight: 800, letterSpacing: "1px" }} aria-label={`${value} su ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ opacity: i < Math.round(value) ? 1 : 0.22 }}>★</span>
      ))}
    </span>
  );
}
