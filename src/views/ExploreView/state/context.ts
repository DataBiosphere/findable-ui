import { createContext } from "react";
import { INITIAL_STATE } from "./constants";
import { ExploreViewContextValue } from "./types";

/**
 * Context for the ExploreView state provider.
 */
export const ExploreViewContext = createContext<ExploreViewContextValue>({
  dispatch: () => undefined,
  state: INITIAL_STATE,
});
