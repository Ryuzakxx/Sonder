"use client";

import { useState } from "react";

export function useMediaActions() {
  const [completed, setCompleted] = useState(false);

  return {
    completed,
    toggleCompleted: () => setCompleted((current) => !current)
  };
}
