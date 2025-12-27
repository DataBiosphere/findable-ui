import { useExploreState } from "../../../../hooks/useExploreState";
import { UseExploreEntityStateProps } from "./types";
import { useMemo } from "react";

/**
 * Returns the current state for the entity list.
 * @param entityListType - Entity identifier.
 * @returns Entity list state.
 */
export const useExploreEntityState = (
  entityListType: string,
): UseExploreEntityStateProps => {
  const { exploreState } = useExploreState();
  const {
    entityPageState,
    entityStateByCategoryGroupConfigKey,
    paginationState: { index, pageSize },
  } = exploreState;
  const { categoryGroupConfigKey, sorting } = entityPageState[entityListType];
  const entityState = entityStateByCategoryGroupConfigKey.get(
    categoryGroupConfigKey,
  );
  const { filterState = [] } = entityState || {};
  return useMemo(() => {
    return {
      filterState,
      pagination: { index, pageSize },
      sorting,
    };
  }, [filterState, index, pageSize, sorting]);
};
