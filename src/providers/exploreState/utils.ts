import { SelectedFilter } from "../../common/entities";
import { CategoryConfig } from "../../config/entities";
import { ExploreState, PaginationState } from "../exploreState";
import {
  CategoryGroupConfigKey,
  EntityPageState,
  EntityPageStateMapper,
  EntityState,
} from "./entities";
import { DEFAULT_ENTITY_STATE } from "./initializer/constants";

/**
 * Returns the category group config key for the current entity.
 * @param entityPath - Entity path.
 * @param entityPageState - Entity page state mapper.
 * @returns category group config key.
 */
export function getEntityCategoryGroupConfigKey(
  entityPath: string,
  entityPageState: EntityPageStateMapper
): CategoryGroupConfigKey {
  return entityPageState[entityPath].categoryGroupConfigKey;
}

/**
 * Returns the category configs for the current entity.
 * @param state - Explore state.
 * @returns category configs.
 */
export function getEntityCategoryConfigs(
  state: ExploreState
): CategoryConfig[] | undefined {
  return state.entityStateByCategoryGroupConfigKey.get(
    getEntityCategoryGroupConfigKey(state.tabValue, state.entityPageState)
  )?.categoryConfigs;
}

/**
 * Returns the entity state for the given category group config key.
 * @param categoryGroupConfigKey - Category group config key.
 * @param state - Explore state.
 * @returns entity state.
 */
export function getEntityState(
  categoryGroupConfigKey: CategoryGroupConfigKey,
  state: ExploreState
): EntityState {
  return (
    state.entityStateByCategoryGroupConfigKey.get(categoryGroupConfigKey) ||
    DEFAULT_ENTITY_STATE
  );
}

/**
 * Returns the filter count.
 * @param filterState - Filter state.
 * @returns filter count.
 */
export function getFilterCount(filterState: SelectedFilter[]): number {
  return filterState.reduce((acc, filter) => acc + filter.value.length, 0);
}

/**
 * Resets pagination.
 * @param paginationState - Pagination state.
 * @returns a reset pagination state.
 */
export function resetPage(paginationState: PaginationState): PaginationState {
  const nextPaginationState = { ...paginationState };
  nextPaginationState.index = null;
  nextPaginationState.currentPage = 1;
  return nextPaginationState;
}

/**
 * Updates entity page state for the given entity path.
 * @param entityPath - Entity path.
 * @param entityPageState - Entity page state.
 * @param nextEntityPageState - Partial next entity page state.
 * @returns updated entity page state.
 */
export function updateEntityPageState(
  entityPath: string, // entityListType.
  entityPageState: EntityPageStateMapper,
  nextEntityPageState: Partial<EntityPageState>
): EntityPageStateMapper {
  return {
    ...entityPageState,
    [entityPath]: {
      ...entityPageState[entityPath],
      ...nextEntityPageState,
    },
  };
}

/**
 * Updates entity state by category group config key.
 * @param state - Explore state.
 * @param nextEntityState - Partial next entity state.
 * @returns updated entity state by category group config key.
 */
export function updateEntityStateByCategoryGroupConfigKey(
  state: ExploreState,
  nextEntityState: Partial<EntityState>
): void {
  const entityStateByCategoryGroupConfigKey =
    state.entityStateByCategoryGroupConfigKey;
  const categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
    state.tabValue,
    state.entityPageState
  );
  const entityState = state.entityStateByCategoryGroupConfigKey.get(
    categoryGroupConfigKey
  );
  if (entityState) {
    entityStateByCategoryGroupConfigKey.set(categoryGroupConfigKey, {
      ...entityState,
      ...nextEntityState,
    });
  }
}
