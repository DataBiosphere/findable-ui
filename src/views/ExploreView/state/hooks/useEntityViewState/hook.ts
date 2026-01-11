import { useContext } from "react";
import { DEFAULT_ENTITY_VIEW_STATE } from "../../constants";
import { ExploreViewContext } from "../../context";
import { EntityId } from "../../types";
import { UseEntityViewState } from "./types";

/**
 * Hook to access ExploreView state for a specific entity.
 *
 * @param entityId - Entity identifier.
 * @returns Entity view state.
 */
export const useEntityViewState = (entityId: EntityId): UseEntityViewState => {
  const { state } = useContext(ExploreViewContext);
  return state[entityId] ?? DEFAULT_ENTITY_VIEW_STATE;
};
