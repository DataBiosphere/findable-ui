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
import { CategoryGroup, SiteConfig } from "../config/entities";
import { useAuthentication } from "../hooks/useAuthentication/useAuthentication";
import {
  buildCategoryViews,
  buildNextFilterState,
} from "../hooks/useCategoryFilter";
import { useConfig } from "../hooks/useConfig";
import { useURLFilterParams } from "../hooks/useURLFilterParams";
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
  ProcessRelatedResponsePayload,
  ResetExploreResponsePayload,
  ToggleEntityViewPayload,
  UpdateColumnVisibilityPayload,
  UpdateEntityViewAccessPayload,
  UpdateFilterPayload,
  UpdateRowSelectionPayload,
  UpdateSortingPayload,
} from "./exploreState/payloads/entities";
import {
  buildEntityStateSavedFilterState,
  buildNextSavedFilterState,
  getEntityCategoryGroupConfigKey,
  getEntityState,
  getEntityStateSavedSorting,
  getFilterCount,
  patchEntityListItems,
  resetPage,
  updateEntityPageState,
  updateEntityPageStateSorting,
  updateEntityStateByCategoryGroupConfigKey,
  updateSelectColumnVisibility,
} from "./exploreState/utils";

export type CatalogState = string | undefined;

/**
 * Entity view.
 */
export enum ENTITY_VIEW {
  EXACT = "EXACT",
  RELATED = "RELATED",
}

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
  isRelatedView: boolean;
  listItems: ListItems;
  listView: ENTITY_VIEW | undefined;
  loading: boolean;
  paginationState: PaginationState;
  relatedListItems: RelatedListItems;
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
 * Related list items.
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding react query or similar
export type RelatedListItems = any[] | undefined;

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
  const { isEnabled: isAuthEnabled, token } = useAuthentication();
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

  // does this help? https://hswolff.com/blog/how-to-usecontext-with-usereducer/
  const exploreContextValue = useMemo(() => {
    return { exploreDispatch, exploreState };
  }, [exploreDispatch, exploreState]);

  // Reset explore response when token changes.
  useEffect(() => {
    if (!isAuthEnabled) return;
    exploreDispatch({
      payload: undefined,
      type: ExploreActionKind.ResetExploreResponse,
    });
  }, [exploreDispatch, isAuthEnabled, token]);

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
  ProcessRelatedResponse = "PROCESS_RELATED_RESPONSE",
  ResetExploreResponse = "RESET_EXPLORE_RESPONSE",
  ResetState = "RESET_STATE",
  SelectEntityType = "SELECT_ENTITY_TYPE",
  ToggleEntityView = "TOGGLE_ENTITY_VIEW",
  UpdateColumnVisibility = "UPDATE_COLUMN_VISIBILITY",
  UpdateEntityViewAccess = "UPDATE_ENTITY_VIEW_ACCESS",
  UpdateFilter = "UPDATE_FILTER",
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
  | ProcessRelatedResponseAction
  | ResetExploreResponseAction
  | ResetStateAction
  | SelectEntityTypeAction
  | ToggleEntityViewAction
  | UpdateColumnVisibilityAction
  | UpdateEntityViewAccessAction
  | UpdateFilterAction
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
 * Process related response action.
 */
type ProcessRelatedResponseAction = {
  payload: ProcessRelatedResponsePayload;
  type: ExploreActionKind.ProcessRelatedResponse;
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
 * Toggle entity view action.
 */
type ToggleEntityViewAction = {
  payload: ToggleEntityViewPayload;
  type: ExploreActionKind.ToggleEntityView;
};

/**
 * Update column visibility action.
 */
type UpdateColumnVisibilityAction = {
  payload: UpdateColumnVisibilityPayload;
  type: ExploreActionKind.UpdateColumnVisibility;
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
      const savedFilterState = buildEntityStateSavedFilterState(
        payload.categoryKey,
        payload.selectedValue,
        payload.selected
      );
      const savedSorting = getEntityStateSavedSorting(
        state,
        payload.selectedValue,
        payload.selected
      );
      updateEntityStateByCategoryGroupConfigKey(state, {
        filterState,
        savedFilterState,
      });
      return {
        ...state,
        entityPageState: updateEntityPageStateSorting(state, savedSorting),
        filterCount: getFilterCount(filterState),
        filterState,
        paginationState: resetPage(state.paginationState),
      };
    }
    /**
     * Clear all filters
     **/
    case ExploreActionKind.ClearFilters: {
      const filterCount = 0;
      const filterState: SelectedFilter[] = [];
      const savedFilterState: SelectedFilter[] = [];
      updateEntityStateByCategoryGroupConfigKey(state, {
        filterState,
        savedFilterState,
      });
      return {
        ...state,
        filterCount,
        filterState,
        paginationState: resetPage(state.paginationState),
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
      return {
        ...state,
        paginationState: nextPaginationState,
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
      };
    }
    /**
     * Process related response
     */
    case ExploreActionKind.ProcessRelatedResponse: {
      return {
        ...state,
        relatedListItems: payload.relatedListItems,
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
      return {
        ...state,
        categoryGroups: entityState.categoryGroups,
        categoryViews: entityState.categoryViews,
        filterCount: getFilterCount(entityState.filterState),
        filterState: entityState.filterState,
        listItems: [],
        loading: true,
        paginationState: resetPage(state.paginationState),
        tabValue: payload,
      };
    }
    /**
     * Toggle entity view
     */
    case ExploreActionKind.ToggleEntityView: {
      return {
        ...state,
        isRelatedView: payload === ENTITY_VIEW.RELATED,
        listView: payload,
      };
    }
    /**
     * Update column visibility
     **/
    case ExploreActionKind.UpdateColumnVisibility: {
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { columnsVisibility: payload }
        ),
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
      const savedFilterState: SelectedFilter[] = []; // Clear saved filter state.
      updateEntityStateByCategoryGroupConfigKey(state, {
        filterState,
        savedFilterState,
      });
      return {
        ...state,
        filterCount: getFilterCount(filterState),
        filterState,
        paginationState: resetPage(state.paginationState),
      };
    }
    /**
     * Update row selection
     */
    case ExploreActionKind.UpdateRowSelection: {
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { rowSelection: payload }
        ),
      };
    }
    /**
     * Update sorting
     **/
    case ExploreActionKind.UpdateSorting: {
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { sorting: payload }
        ),
        paginationState: resetPage(state.paginationState),
      };
    }

    default:
      return state;
  }
}
