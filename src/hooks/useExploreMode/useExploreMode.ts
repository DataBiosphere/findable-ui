import { useMemo } from "react";
import { useConfig } from "../useConfig";
import { ExploreMode } from "./types";

/**
 * Returns configured explore mode.
 * SS = Server-side
 * CS = Client-side
 * @returns explore mode.
 */
export const useExploreMode = (): ExploreMode => {
  const { entityConfig } = useConfig();
  const { exploreMode } = entityConfig;
  return useMemo(() => exploreMode, [exploreMode]);
};
