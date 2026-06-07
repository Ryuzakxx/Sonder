"use client";

import { useState } from "react";

export function useReviewDraft(initialBody = "") {
  const [body, setBody] = useState(initialBody);

  return { body, setBody };
}
