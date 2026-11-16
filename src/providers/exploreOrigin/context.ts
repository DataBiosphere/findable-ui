import { createContext } from "react";
import type { ExploreOriginContextProps } from "./types";

/**
 * Explore origin context; undefined when no ExploreOriginProvider is mounted.
 */
export const ExploreOriginContext = createContext<
  ExploreOriginContextProps | undefined
>(undefined);
