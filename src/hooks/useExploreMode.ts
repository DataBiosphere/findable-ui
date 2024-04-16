import { useMemo } from "react";
import { useConfig } from "./useConfig";

export type ExploreMode = EXPLORE_MODE;

export enum EXPLORE_MODE {
  CS_FETCH_CS_FILTERING = "CS_FETCH_CS_FILTERING",
  SS_FETCH_CS_FILTERING = "SS_FETCH_CS_FILTERING",
  SS_FETCH_SS_FILTERING = "SS_FETCH_SS_FILTERING",
}

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
