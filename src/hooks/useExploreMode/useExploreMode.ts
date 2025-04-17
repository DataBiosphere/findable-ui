import { useMemo } from "react";
import { useConfig } from "../useConfig";
import { ExploreMode } from "./types";

/**
 * Returns configured explore mode:
 * - Client-side fetch, client-side filtering.
 * - Server-side fetch, client-side filtering.
 * - Server-side fetch, server-side filtering.
 * @returns explore mode.
 */
export const useExploreMode = (): ExploreMode => {
  const { entityConfig } = useConfig();
  const { exploreMode } = entityConfig;
  return useMemo(() => exploreMode, [exploreMode]);
};
