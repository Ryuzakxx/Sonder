"use client";

import { useMemo } from "react";
import type { FeaturedCollection } from "../types/list";

export function useCollections(collections: FeaturedCollection[]) {
  return useMemo(() => collections, [collections]);
}
