import { ColumnSort } from "@tanstack/react-table";
import {
  CategoryKey,
  CategoryValueKey,
  SelectedFilter,
} from "../../common/entities";
import { RowPreviewState } from "../../components/Table/features/RowPreview/entities";
import { ACCESSOR_KEYS } from "../../components/TableCreator/common/constants";
import { ExploreState, ListItems, PaginationState } from "../exploreState";
import {
  CategoryGroupConfigKey,
  EntityPageState,
  EntityPageStateMapper,
  EntityState,
  EntityStateSavedFilter,
  ListItem,
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
  const savedFilter = getEntityStateSavedFilter(state, selectedValue);
  return savedFilter?.filters || [];
}

/**
 * Closes row preview, if row preview is enabled.
 * If row preview is enabled, the row preview state value is set to false.
 * @param rowPreview - Row preview state.
 * @returns row preview state with row preview value set to false.
 */
export function closeRowPreview(rowPreview: RowPreviewState): RowPreviewState {
  if (!rowPreview) return rowPreview;
  const [[key]] = Object.entries(rowPreview);
  return { [key]: false };
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
 * Returns the saved filter/sorting for the given category key.
 * @param state - Explore state.
 * @param categoryValueKey - Category key.
 * @returns saved filter/sorting for the category key.
 */
export function getEntityStateSavedFilter(
  state: ExploreState,
  categoryValueKey: CategoryValueKey
): EntityStateSavedFilter | undefined {
  const entityState = getEntityState(state);
  return entityState.savedFilterByCategoryValueKey?.get(categoryValueKey);
}

/**
 * Returns entity state "saved filter" sorting for the given category value key.
 * @param state - Explore state.
 * @param selectedValue - Key of category value that has been de/selected.
 * @param selected - True if value is selected, false if de-selected.
 * @returns sorting.
 */
export function getEntityStateSavedSorting(
  state: ExploreState,
  selectedValue: CategoryValueKey,
  selected: boolean
): ColumnSort[] | undefined {
  if (!selected) return;
  const savedFilter = getEntityStateSavedFilter(state, selectedValue);
  return savedFilter?.sorting;
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
 * Returns list items with updated list items patched.
 * @param listItems - List items.
 * @param updatedListItems - List items to patch.
 * @param listItemKey - List item key identifier to map list items.
 * @returns list items with updated list items patched.
 */
export function patchEntityListItems(
  listItems: ListItems,
  updatedListItems: ListItems,
  listItemKey: keyof ListItem
): ListItems {
  if (!listItems || !updatedListItems) return listItems;
  const listItemById = new Map(
    listItems.map((listItem) => [listItem[listItemKey], listItem])
  );
  updatedListItems.forEach((listItem) => {
    listItemById.set(listItem[listItemKey], listItem);
  });
  return [...listItemById.values()];
}

/**
 * Returns the updated row preview state with the updated list item patched.
 * @param rowPreview - Row preview state.
 * @param updatedListItems - List items to patch.
 * @param listItemKey - List item key identifier to map list items.
 * @returns row preview state with updated list item patched.
 */
export function patchRowPreview(
  rowPreview: RowPreviewState,
  updatedListItems: ListItems,
  listItemKey: keyof ListItem
): RowPreviewState {
  if (!rowPreview || !updatedListItems) return rowPreview;
  for (const updatedListItem of updatedListItems) {
    if (updatedListItem[listItemKey] === rowPreview.id) {
      return { ...rowPreview, original: updatedListItem };
    }
  }
  return rowPreview;
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
 * Updates entity page state for the current entity and entities that share the same category group config key.
 * @param state - Explore state.
 * @param nextEntityPageState - Partial next entity page state.
 * @param categoryGroupConfigKey - Category group config key.
 * @returns entity page state.
 */
export function updateEntityPageStateWithCommonCategoryGroupConfigKey(
  state: ExploreState,
  nextEntityPageState: Partial<EntityPageState>,
  categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
    state.tabValue,
    state.entityPageState
  )
): EntityPageStateMapper {
  return Object.entries(state.entityPageState).reduce(
    (acc, [entityPath, entityPageState]) => {
      if (entityPageState.categoryGroupConfigKey === categoryGroupConfigKey) {
        return {
          ...acc,
          [entityPath]: { ...entityPageState, ...nextEntityPageState },
        };
      }
      return { ...acc, [entityPath]: entityPageState };
    },
    {} as EntityPageStateMapper
  );
}

/**
 * Updates entity state by category group config key.
 * @param state - Explore state.
 * @param nextEntityState - Partial next entity state.
 * @param categoryGroupConfigKey - Category group config key.
 * @returns updated entity state by category group config key.
 */
export function updateEntityStateByCategoryGroupConfigKey(
  state: ExploreState,
  nextEntityState: Partial<EntityState>,
  categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
    state.tabValue,
    state.entityPageState
  )
): void {
  const entityState = getEntityState(state, categoryGroupConfigKey);
  if (entityState) {
    setEntityStateByCategoryGroupConfigKey(categoryGroupConfigKey, state, {
      ...entityState,
      ...nextEntityState,
    });
  }
}

/**
 *  Updates the entity page state for each entity with row selection enabled,
 *  by updating the visibility of the "select" column based on user access and resetting row selection state.
 * @param state - Explore state.
 * @param canEdit - User has edit access.
 * @returns new entity page state mapper with updated column visibility and row selection state.
 */
export function updateSelectColumnVisibility(
  state: ExploreState,
  canEdit: boolean
): EntityPageStateMapper {
  return Object.entries(state.entityPageState).reduce(
    (acc, [entityPath, entityPageState]) => {
      if (entityPageState.enableRowSelection) {
        return {
          ...acc,
          [entityPath]: {
            ...entityPageState,
            columnsVisibility: {
              ...entityPageState.columnsVisibility,
              [ACCESSOR_KEYS.SELECT]: canEdit,
            },
            rowSelection: {},
          },
        };
      }
      return { ...acc, [entityPath]: entityPageState };
    },
    {} as EntityPageStateMapper
  );
}
