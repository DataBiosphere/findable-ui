import { useReducer } from "react";
import { exploreViewReducer } from "../../reducer";
import { ExploreViewContextValue } from "../../types";
import { INITIAL_STATE } from "../../constants";

export const useExploreViewReducer = (): ExploreViewContextValue => {
  const [state, dispatch] = useReducer(exploreViewReducer, INITIAL_STATE);

  return { dispatch, state };
};
