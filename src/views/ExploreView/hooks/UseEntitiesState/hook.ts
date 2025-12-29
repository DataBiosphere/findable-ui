import { useExploreState } from "../../../../hooks/useExploreState";
import { UseEntitiesStateProps } from "./types";
import { useMemo } from "react";

// TODO(fran): Change to use TableState instead of ExploreState.

/**
 * Hook for retrieving entities (entity list) state based on entity identifier.
 *
 * @param entityListType - Entity identifier.
 * @returns Entities (entity list) state.
 */
export const useEntitiesState = (
  entityListType: string,
): UseEntitiesStateProps => {
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
