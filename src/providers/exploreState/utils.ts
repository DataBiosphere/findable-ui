import {
  CategoryKey,
  CategoryValueKey,
  SelectedFilter,
} from "../../common/entities";
import { ExploreState, PaginationState } from "../exploreState";
import {
  CategoryGroupConfigKey,
  EntityPageState,
  EntityPageStateMapper,
  EntityState,
  SavedState,
} from "./entities";
import { DEFAULT_ENTITY_STATE } from "./initializer/constants";

/**
 * Returns the entity state saved filter state for the given category key.
 * @param categoryKey - Category key.
 * @param selectedValue - Key of category value that has been de/selected.
 * @param selected - True if value is selected, false if de-selected.
 * @returns entity state saved filter state.
 */
export function buildEntityStateSavedFilterState(
  categoryKey: CategoryKey,
  selectedValue: CategoryValueKey,
  selected: boolean
): SelectedFilter[] {
  if (!selected) return [];
  return [{ categoryKey, value: [selectedValue] }];
}

/**
 * Build new set of selected filters on de/select of a "saved filter" filter.
 * @param state - Explore state.
 * @param selectedValue - Key of category value that has been de/selected.
 * @param selected - True if value is selected, false if de-selected.
 * @returns new selected filters.
 */
export function buildNextSavedFilterState(
  state: ExploreState,
  selectedValue: CategoryValueKey,
  selected: boolean
): SelectedFilter[] {
  if (!selected) return []; // Clears all filters on de-select of saved filter.
  const savedState = getSavedState(state, selectedValue);
  return savedState?.filters || [];
}

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
 * Returns the entity state for the current entity.
 * @param state - Explore state.
 * @param categoryGroupConfigKey - Category group config key.
 * @returns entity state.
 */
export function getEntityState(
  state: ExploreState,
  categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
    state.tabValue,
    state.entityPageState
  )
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
 * Returns the saved state for the given category key.
 * @param state - Explore state.
 * @param categoryValueKey - Category key.
 * @returns saved state for the category key.
 */
export function getSavedState(
  state: ExploreState,
  categoryValueKey: CategoryValueKey
): SavedState | undefined {
  const entityState = getEntityState(state);
  return entityState.savedStateByCategoryValueKey?.get(categoryValueKey);
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
 * Sets entity state for the given category group config key.
 * @param categoryGroupConfigKey - Category group config key.
 * @param state - Explore state.
 * @param nextEntityState - Next entity state.
 */
function setEntityStateByCategoryGroupConfigKey(
  categoryGroupConfigKey: CategoryGroupConfigKey,
  state: ExploreState,
  nextEntityState: EntityState
): void {
  state.entityStateByCategoryGroupConfigKey.set(
    categoryGroupConfigKey,
    nextEntityState
  );
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
  const categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
    state.tabValue,
    state.entityPageState
  );
  const entityState = getEntityState(state, categoryGroupConfigKey);
  if (entityState) {
    setEntityStateByCategoryGroupConfigKey(categoryGroupConfigKey, state, {
      ...entityState,
      ...nextEntityState,
    });
  }
}
