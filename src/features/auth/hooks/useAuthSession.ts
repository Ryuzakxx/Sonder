"use client";

import { useState } from "react";
import type { AuthUser } from "../types/auth";

export function useAuthSession() {
  const [user] = useState<AuthUser | null>(null);

  return { authenticated: Boolean(user), user };
}
