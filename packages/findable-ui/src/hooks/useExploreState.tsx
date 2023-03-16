import { useContext } from "react";
import {
  ExploreStateContext,
  ExploreStateContextProps,
} from "../providers/exploreState";

/**
 * Returns explore state context.
 * @returns explore state context.
 */
export const useExploreState = (): ExploreStateContextProps => {
  return useContext(ExploreStateContext);
};
