interface Props {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

export function Avatar({ src, name, size = 36, className = "" }: Props) {
  const initials = name ? name.slice(0, 2).toUpperCase() : "?";
  if (src) {
    return (
      <img
        src={src} alt={name ?? ""}
        width={size} height={size}
        loading="lazy"
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className={`rounded-full flex items-center justify-center text-xs font-semibold text-[#888] bg-[#1e1e1e] shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}
