import { createContext } from "react";
import type { ExploreListContextProps } from "./types";

/**
 * Explore list context; undefined when no ExploreListProvider is mounted.
 */
export const ExploreListContext = createContext<
  ExploreListContextProps | undefined
>(undefined);
