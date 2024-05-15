import { SelectedFilter } from "../../common/entities";
import { CategoryConfig } from "../../config/entities";
import { ExploreState, PaginationState } from "../exploreState";
import {
  CategoriesConfigKey,
  EntityPageState,
  EntityPageStateMapper,
  EntityState,
} from "./entities";
import { DEFAULT_ENTITY_STATE } from "./initializer/constants";

/**
 * Returns the categories config key for the current entity.
 * @param entityPath - Entity path.
 * @param entityPageState - Entity page state mapper.
 * @returns categories config key.
 */
export function getEntityCategoriesConfigKey(
  entityPath: string,
  entityPageState: EntityPageStateMapper
): CategoriesConfigKey {
  return entityPageState[entityPath].categoriesConfigKey;
}

/**
 * Returns the category configs for the current entity.
 * @param state - Explore state.
 * @returns category configs.
 */
export function getEntityCategoryConfigs(
  state: ExploreState
): CategoryConfig[] | undefined {
  const categoriesConfigKey = getEntityCategoriesConfigKey(
    state.tabValue,
    state.entityPageState
  );
  return state.entityStateByCategoriesConfigKey.get(categoriesConfigKey)
    ?.categoryConfigs;
}

/**
 * Returns the entity state for the given categories config key.
 * @param categoriesConfigKey - Categories config key.
 * @param state - Explore state.
 * @returns entity state.
 */
export function getEntityState(
  categoriesConfigKey: CategoriesConfigKey,
  state: ExploreState
): EntityState {
  return (
    state.entityStateByCategoriesConfigKey.get(categoriesConfigKey) ||
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
 * Updates entity state by categories config key.
 * @param state - Explore state.
 * @param nextEntityState - Partial next entity state.
 * @returns updated entity state by categories config key.
 */
export function updateEntityStateByCategoriesConfigKey(
  state: ExploreState,
  nextEntityState: Partial<EntityState>
): void {
  const entityStateByCategoriesConfigKey =
    state.entityStateByCategoriesConfigKey;
  const categoriesConfigKey = getEntityCategoriesConfigKey(
    state.tabValue,
    state.entityPageState
  );
  const entityState =
    state.entityStateByCategoriesConfigKey.get(categoriesConfigKey);
  if (entityState) {
    entityStateByCategoriesConfigKey.set(categoriesConfigKey, {
      ...entityState,
      ...nextEntityState,
    });
  }
}
