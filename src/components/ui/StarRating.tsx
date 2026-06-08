"use client";
import { useState } from "react";

interface Props {
  value: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (v: number) => void;
}

export function StarRating({ value, max = 5, size = 14, interactive = false, onChange }: Props) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex gap-0.5" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= display;
        return (
          <svg
            key={i}
            width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#c8a97e" : "none"}
            stroke={filled ? "#c8a97e" : "#444"} strokeWidth={2}
            className={interactive ? "cursor-pointer transition-all" : ""}
            onMouseEnter={() => interactive && setHover(i + 1)}
            onClick={() => interactive && onChange?.(i + 1)}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}
