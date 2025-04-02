import { RowSelectionState } from "@tanstack/react-table";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AzulSearchIndex } from "../apis/azul/common/entities";
import { SelectCategoryView, SelectedFilter } from "../common/entities";
import { RowPreviewState } from "../components/Table/features/RowPreview/entities";
import { CategoryGroup, SiteConfig } from "../config/entities";
import { useToken } from "../hooks/authentication/token/useToken";
import {
  buildCategoryViews,
  buildNextFilterState,
} from "../hooks/useCategoryFilter";
import { useConfig } from "../hooks/useConfig";
import { useURLFilterParams } from "../hooks/useURLFilterParams";
import { updateGroupingAction } from "./exploreState/actions/updateGrouping/action";
import { UpdateGroupingAction } from "./exploreState/actions/updateGrouping/types";
import { updateColumnVisibilityAction } from "./exploreState/actions/updateVisibility/action";
import { UpdateColumnVisibilityAction } from "./exploreState/actions/updateVisibility/types";
import {
  EntityPageStateMapper,
  EntityStateByCategoryGroupConfigKey,
  ListItem,
} from "./exploreState/entities";
import {
  DEFAULT_PAGINATION_STATE,
  INITIAL_STATE,
} from "./exploreState/initializer/constants";
import { initReducerArguments } from "./exploreState/initializer/utils";
import {
  ApplySavedFilterPayload,
  PaginateTablePayload,
  PatchExploreResponsePayload,
  ProcessExploreResponsePayload,
  ResetExploreResponsePayload,
  UpdateEntityFiltersPayload,
  UpdateEntityViewAccessPayload,
  UpdateFilterPayload,
  UpdateRowPreviewPayload,
  UpdateRowSelectionPayload,
  UpdateSortingPayload,
} from "./exploreState/payloads/entities";
import {
  buildEntityStateSavedFilterState,
  buildNextSavedFilterState,
  closeRowPreview,
  getEntityCategoryGroupConfigKey,
  getEntityState,
  getEntityStateSavedProperty,
  getFilterCount,
  patchEntityListItems,
  resetPage,
  updateEntityPageState,
  updateEntityPageStateWithCommonCategoryGroupConfigKey,
  updateEntityStateByCategoryGroupConfigKey,
  updateSelectColumnVisibility,
} from "./exploreState/utils";

export type CatalogState = string | undefined;

/**
 * Explore context.
 */
export interface ExploreContext {
  config: SiteConfig;
  entityList: string;
}

/**
 * Explore state.
 */
export type ExploreState = {
  catalogState: CatalogState;
  categoryGroups?: CategoryGroup[];
  categoryViews: SelectCategoryView[];
  entityPageState: EntityPageStateMapper;
  entityStateByCategoryGroupConfigKey: EntityStateByCategoryGroupConfigKey;
  featureFlagState: FeatureFlagState;
  filterCount: number;
  filterState: SelectedFilter[];
  listItems: ListItems;
  loading: boolean;
  paginationState: PaginationState;
  rowPreview: RowPreviewState;
  tabValue: string;
};

/**
 * Model of explore state context.
 */
export interface ExploreStateContextProps {
  exploreDispatch: Dispatch<ExploreAction>;
  exploreState: ExploreState;
}

export type FeatureFlagState = string | undefined;

/**
 * List items.
 */
export type ListItems = ListItem[] | undefined;

/**
 * Pagination index.
 */
export interface PaginationIndex {
  type: AzulSearchIndex;
  value: string | null;
}

/**
 * Pagination response.
 */
export interface PaginationResponse {
  nextIndex: PaginationIndex | null;
  pages: number;
  pageSize: number;
  previousIndex: PaginationIndex | null;
  rows: number;
}

/**
 * Pagination state.
 */
export interface PaginationState {
  currentPage: number;
  index: PaginationIndex | null;
  nextIndex: PaginationIndex | null;
  pages: number;
  pageSize: number;
  previousIndex: PaginationIndex | null;
  rows: number;
}

/**
 * Explore state context for storing and using filter-related and explore state.
 */
export const ExploreStateContext = createContext<ExploreStateContextProps>({
  /**
   * The defaultValue argument is only used when a component does not have a matching Provider
   * above it in the tree. This default value can be helpful for testing components
   * in isolation without wrapping them. Note: passing undefined as a Provider value
   * does not cause consuming components to use defaultValue.
   * So basically the default value is not used...
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- default note used
  exploreDispatch: () => {},
  exploreState: INITIAL_STATE,
});

/**
 * Explore state provider for consuming components to subscribe to changes in filter-related and explore-related state.
 * @param props - Component inputs.
 * @param props.children - Set of children components that can possibly consume the query provider.
 * @param props.entityListType - type of list to display
 * @returns Provider element to be used by consumers to both update explore state and subscribe to changes in explore state.
 */
export function ExploreStateProvider({
  children,
  entityListType,
}: {
  children: ReactNode | ReactNode[];
  entityListType: string;
}): JSX.Element {
  const { config, defaultEntityListType } = useConfig();
  const { decodedCatalogParam, decodedFeatureFlagParam, decodedFilterParam } =
    useURLFilterParams();
  const { token } = useToken();
  const entityList = entityListType || defaultEntityListType;
  const [initializerArg] = useState(() =>
    initReducerArguments(
      config,
      entityList,
      decodedFilterParam,
      decodedCatalogParam,
      decodedFeatureFlagParam
    )
  );

  const [exploreState, exploreDispatch] = useReducer(
    (s: ExploreState, a: ExploreAction) =>
      exploreReducer(s, a, {
        config,
        entityList,
      }),
    initializerArg
  );
  console.log("exploreState", exploreState);

  // does this help? https://hswolff.com/blog/how-to-usecontext-with-usereducer/
  const exploreContextValue = useMemo(() => {
    return { exploreDispatch, exploreState };
  }, [exploreDispatch, exploreState]);

  // Reset explore response when token changes.
  useEffect(() => {
    exploreDispatch({
      payload: undefined,
      type: ExploreActionKind.ResetExploreResponse,
    });
  }, [exploreDispatch, token]);

  return (
    <ExploreStateContext.Provider value={exploreContextValue}>
      {children}
    </ExploreStateContext.Provider>
  );
}

/**
 * Explore action kind.
 */
export enum ExploreActionKind {
  ApplySavedFilter = "APPLY_SAVED_FILTER",
  ClearFilters = "CLEAR_FILTERS",
  PaginateTable = "PAGINATE_TABLE",
  PatchExploreResponse = "PATCH_EXPLORE_RESPONSE",
  ProcessExploreResponse = "PROCESS_EXPLORE_RESPONSE",
  ResetExploreResponse = "RESET_EXPLORE_RESPONSE",
  ResetState = "RESET_STATE",
  SelectEntityType = "SELECT_ENTITY_TYPE",
  UpdateColumnVisibility = "UPDATE_COLUMN_VISIBILITY",
  UpdateEntityFilters = "UPDATE_ENTITY_FILTERS",
  UpdateEntityViewAccess = "UPDATE_ENTITY_VIEW_ACCESS",
  UpdateFilter = "UPDATE_FILTER",
  UpdateGrouping = "UPDATE_GROUPING",
  UpdateRowPreview = "UPDATE_ROW_PREVIEW",
  UpdateRowSelection = "UPDATE_ROW_SELECTION",
  UpdateSorting = "UPDATE_SORTING",
}

/**
 * Explore action.
 */
export type ExploreAction =
  | ApplySavedFilterAction
  | ClearFiltersAction
  | PaginateTableAction
  | PatchExploreResponseAction
  | ProcessExploreResponseAction
  | ResetExploreResponseAction
  | ResetStateAction
  | SelectEntityTypeAction
  | UpdateColumnVisibilityAction
  | UpdateEntityFiltersAction
  | UpdateEntityViewAccessAction
  | UpdateFilterAction
  | UpdateGroupingAction
  | UpdateRowPreviewAction
  | UpdateRowSelectionAction
  | UpdateSortingAction;

/**
 * Apply saved filter action.
 */
type ApplySavedFilterAction = {
  payload: ApplySavedFilterPayload;
  type: ExploreActionKind.ApplySavedFilter;
};

/**
 * Clear filters action.
 */
type ClearFiltersAction = {
  payload: undefined;
  type: ExploreActionKind.ClearFilters;
};

/**
 * Paginate table action.
 */
type PaginateTableAction = {
  payload: PaginateTablePayload;
  type: ExploreActionKind.PaginateTable;
};

/**
 * Patch explore response action.
 */
type PatchExploreResponseAction = {
  payload: PatchExploreResponsePayload;
  type: ExploreActionKind.PatchExploreResponse;
};

/**
 * Process explore response action.
 */
type ProcessExploreResponseAction = {
  payload: ProcessExploreResponsePayload;
  type: ExploreActionKind.ProcessExploreResponse;
};

/**
 * Reset explore response action.
 */
type ResetExploreResponseAction = {
  payload: ResetExploreResponsePayload;
  type: ExploreActionKind.ResetExploreResponse;
};

/**
 * Reset state type action.
 */
type ResetStateAction = {
  payload: string;
  type: ExploreActionKind.ResetState;
};

/**
 * Select entity type action.
 */
type SelectEntityTypeAction = {
  payload: string;
  type: ExploreActionKind.SelectEntityType;
};

/**
 * Update entity filters action.
 */
type UpdateEntityFiltersAction = {
  payload: UpdateEntityFiltersPayload;
  type: ExploreActionKind.UpdateEntityFilters;
};

/**
 * Update entity view access action.
 */
type UpdateEntityViewAccessAction = {
  payload: UpdateEntityViewAccessPayload;
  type: ExploreActionKind.UpdateEntityViewAccess;
};

/**
 * Update filter action.
 */
type UpdateFilterAction = {
  payload: UpdateFilterPayload;
  type: ExploreActionKind.UpdateFilter;
};

/**
 * Update row preview action.
 */
export type UpdateRowPreviewAction = {
  payload: UpdateRowPreviewPayload;
  type: ExploreActionKind.UpdateRowPreview;
};

/**
 * Update row selection action.
 */
type UpdateRowSelectionAction = {
  payload: UpdateRowSelectionPayload;
  type: ExploreActionKind.UpdateRowSelection;
};

/**
 * Update sorting action.
 */
export type UpdateSortingAction = {
  payload: UpdateSortingPayload;
  type: ExploreActionKind.UpdateSorting;
};

/**
 * Explore reducer.
 * @param state - Explore state.
 * @param action - Reducer action.
 * @param exploreContext - Explore context.
 * @returns updated explore state.
 */
function exploreReducer(
  state: ExploreState,
  action: ExploreAction,
  exploreContext: ExploreContext
): ExploreState {
  const { payload, type } = action;
  const { config, entityList } = exploreContext;

  switch (type) {
    /**
     * Apply saved filter
     **/
    case ExploreActionKind.ApplySavedFilter: {
      const filterState = buildNextSavedFilterState(
        state,
        payload.selectedValue,
        payload.selected
      );
      const rowPreview = closeRowPreview(state.rowPreview);
      const rowSelection: RowSelectionState = {};
      const savedFilterState = buildEntityStateSavedFilterState(
        payload.categoryKey,
        payload.selectedValue,
        payload.selected
      );
      const savedGrouping = getEntityStateSavedProperty(
        state,
        payload.selectedValue,
        payload.selected,
        "grouping"
      );
      const savedSorting = getEntityStateSavedProperty(
        state,
        payload.selectedValue,
        payload.selected,
        "sorting"
      );
      const grouping = savedGrouping || []; // Reset grouping to default if saved grouping is not available.
      const sorting = savedSorting || []; // Reset sorting to default if saved sorting is not available.
      updateEntityStateByCategoryGroupConfigKey(state, {
        filterState,
        savedFilterState,
      });
      return {
        ...state,
        entityPageState: updateEntityPageStateWithCommonCategoryGroupConfigKey(
          state,
          { grouping, rowPreview, rowSelection, sorting }
        ),
        filterCount: getFilterCount(filterState),
        filterState,
        paginationState: resetPage(state.paginationState),
        rowPreview,
      };
    }
    /**
     * Clear all filters
     **/
    case ExploreActionKind.ClearFilters: {
      const filterCount = 0;
      const filterState: SelectedFilter[] = [];
      const rowPreview = closeRowPreview(state.rowPreview);
      const rowSelection: RowSelectionState = {};
      const savedFilterState: SelectedFilter[] = [];
      updateEntityStateByCategoryGroupConfigKey(state, {
        filterState,
        savedFilterState,
      });
      return {
        ...state,
        entityPageState: updateEntityPageStateWithCommonCategoryGroupConfigKey(
          state,
          { rowPreview, rowSelection }
        ),
        filterCount,
        filterState,
        paginationState: resetPage(state.paginationState),
        rowPreview,
      };
    }
    /**
     * Paginate table
     **/
    case ExploreActionKind.PaginateTable: {
      const nextPaginationState = { ...state.paginationState };
      if (payload == "next") {
        nextPaginationState.currentPage++;
        nextPaginationState.index = nextPaginationState.nextIndex;
      } else {
        nextPaginationState.currentPage--;
        nextPaginationState.index = nextPaginationState.previousIndex;
      }
      const rowPreview = closeRowPreview(state.rowPreview);
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { rowPreview }
        ),
        paginationState: nextPaginationState,
        rowPreview,
      };
    }
    /**
     * Patch explore response
     */
    case ExploreActionKind.PatchExploreResponse: {
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { rowSelection: {} }
        ),
        listItems: patchEntityListItems(
          state.listItems,
          payload.updatedListItems,
          payload.listItemKey
        ),
      };
    }
    /**
     * Process explore response
     **/
    case ExploreActionKind.ProcessExploreResponse: {
      const entityPageState = state.entityPageState[state.tabValue];
      const entityState = getEntityState(state);
      const nextCategoryViews = payload.selectCategories
        ? buildCategoryViews(
            [
              ...payload.selectCategories,
              ...entityState.savedSelectCategories, // "savedFilter" select categories are built from config at reducer initialization.
            ],
            entityState.categoryConfigs,
            [...state.filterState, ...entityState.savedFilterState]
          )
        : state.categoryViews;
      const rowPreview = entityPageState.rowPreview;
      updateEntityStateByCategoryGroupConfigKey(state, {
        categoryViews: nextCategoryViews,
      });
      return {
        ...state,
        categoryViews: nextCategoryViews,
        listItems: payload.loading ? [] : payload.listItems,
        loading: payload.loading,
        paginationState: {
          ...state.paginationState,
          ...payload.paginationResponse,
        },
        rowPreview,
      };
    }
    /**
     * Reset explore response.
     **/
    case ExploreActionKind.ResetExploreResponse: {
      return {
        ...state,
        listItems: [],
        loading: true,
        paginationState: DEFAULT_PAGINATION_STATE,
      };
    }
    /**
     * Reset the current state to the initial
     */
    case ExploreActionKind.ResetState: {
      return initReducerArguments(config, entityList, "");
    }
    /**
     * Select entity type
     **/
    case ExploreActionKind.SelectEntityType: {
      if (payload === state.tabValue) {
        return state;
      }
      const entityState = getEntityState(
        state,
        getEntityCategoryGroupConfigKey(payload, state.entityPageState)
      );
      const rowPreview = closeRowPreview(state.rowPreview); // Close row preview, without updating the entity page state row preview.
      return {
        ...state,
        categoryGroups: entityState.categoryGroups,
        categoryViews: entityState.categoryViews,
        filterCount: getFilterCount(entityState.filterState),
        filterState: entityState.filterState,
        listItems: [],
        loading: true,
        paginationState: { ...resetPage(state.paginationState), rows: 0 },
        rowPreview,
        tabValue: payload,
      };
    }
    /**
     * Update column visibility
     **/
    case ExploreActionKind.UpdateColumnVisibility: {
      return updateColumnVisibilityAction(state, payload);
    }
    /**
     * Update entity filters.
     * Updates state for the given entity and entities with the same category group config key, prior to navigation to the entity.
     * Actions for the given entity and entities with the same category group config key:
     * - updates filter state,
     * - clears saved filter state,
     * - resets row selection, and
     * - closes row preview.
     * Actions for the current entity:
     * - closes row preview, without updating the entity page state row preview.
     */
    case ExploreActionKind.UpdateEntityFilters: {
      const {
        entityListType,
        filters: filterState,
        grouping = [],
        sorting = [],
      } = payload;
      const categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
        entityListType,
        state.entityPageState
      );
      const rowPreview = closeRowPreview(
        state.entityPageState[entityListType].rowPreview
      );
      const rowSelection: RowSelectionState = {};
      const savedFilterState: SelectedFilter[] = [];
      updateEntityStateByCategoryGroupConfigKey(
        state,
        {
          filterState,
          savedFilterState,
        },
        categoryGroupConfigKey
      );
      return {
        ...state,
        entityPageState: updateEntityPageStateWithCommonCategoryGroupConfigKey(
          state,
          { grouping, rowPreview, rowSelection, sorting },
          categoryGroupConfigKey
        ),
        rowPreview: closeRowPreview(state.rowPreview),
      };
    }
    /**
     * Update entity view access
     **/
    case ExploreActionKind.UpdateEntityViewAccess: {
      return {
        ...state,
        entityPageState: updateSelectColumnVisibility(state, payload.canEdit),
      };
    }
    /**
     * Update filter
     **/
    case ExploreActionKind.UpdateFilter: {
      const filterState = buildNextFilterState(
        state.filterState,
        payload.categoryKey,
        payload.selectedValue,
        payload.selected
      );
      const rowPreview = closeRowPreview(state.rowPreview);
      const rowSelection: RowSelectionState = {};
      const savedFilterState: SelectedFilter[] = []; // Clear saved filter state.
      updateEntityStateByCategoryGroupConfigKey(state, {
        filterState,
        savedFilterState,
      });
      return {
        ...state,
        entityPageState: updateEntityPageStateWithCommonCategoryGroupConfigKey(
          state,
          { rowPreview, rowSelection }
        ),
        filterCount: getFilterCount(filterState),
        filterState,
        paginationState: resetPage(state.paginationState),
        rowPreview,
      };
    }
    /**
     * Update grouping
     **/
    case ExploreActionKind.UpdateGrouping: {
      return updateGroupingAction(state, payload);
    }
    /**
     * Update row preview
     */
    case ExploreActionKind.UpdateRowPreview: {
      const rowPreview = payload;
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { rowPreview }
        ),
        rowPreview,
      };
    }
    /**
     * Update row selection
     */
    case ExploreActionKind.UpdateRowSelection: {
      const rowSelection = payload;
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { rowSelection }
        ),
      };
    }
    /**
     * Update sorting
     **/
    case ExploreActionKind.UpdateSorting: {
      const rowPreview = closeRowPreview(state.rowPreview);
      const sorting = payload;
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { rowPreview, sorting }
        ),
        paginationState: resetPage(state.paginationState),
        rowPreview,
      };
    }

    default:
      return state;
  }
}
