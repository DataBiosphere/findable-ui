import { ColumnSort } from "@tanstack/react-table";
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
import { SelectCategory, SelectedFilter } from "../common/entities";
import {
  CategoryConfig,
  CategoryGroupConfig,
  EntityPath,
  SiteConfig,
} from "../config/entities";
import { useAuthentication } from "../hooks/useAuthentication/useAuthentication";
import {
  buildCategoryViews,
  buildNextFilterState,
} from "../hooks/useCategoryFilter";
import { useConfig } from "../hooks/useConfig";
import { useURLFilterParams } from "../hooks/useURLFilterParams";
import {
  DEFAULT_PAGINATION_STATE,
  INITIAL_STATE,
} from "./exploreState/constants";
import {
  PaginateTablePayload,
  ProcessExploreResponsePayload,
  ProcessRelatedResponsePayload,
  ResetExploreResponsePayload,
  ToggleEntityViewPayload,
  UpdateColumnVisibilityPayload,
  UpdateFilterPayload,
  UpdateSortingPayload,
} from "./exploreState/payloads/entities";
import {
  getFilterCount,
  initExploreState,
  resetPage,
  updateEntityPageState,
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
 * State for each entity.
 */
export interface EntityPageState {
  categoryConfigs?: CategoryConfig[];
  categoryGroupConfigs?: CategoryGroupConfig[];
  categoryViews: SelectCategory[];
  columnsVisibility: Record<string, boolean>;
  filterCount: number;
  filterState: SelectedFilter[];
  sorting: ColumnSort[];
}

/**
 * State for all entities.
 */
export interface EntityPageStateMapper {
  [key: EntityPath]: EntityPageState;
}

/**
 * Explore state.
 */
export type ExploreState = {
  catalogState: CatalogState;
  categoryGroupConfigs?: CategoryGroupConfig[];
  categoryViews: SelectCategory[];
  entityPageState: EntityPageStateMapper;
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
// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding react query or similar
export type ListItems = any[] | undefined;

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
  const [initReducerState] = useState(() =>
    initExploreState(
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
    initReducerState
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
  ClearFilters = "CLEAR_FILTERS",
  PaginateTable = "PAGINATE_TABLE",
  ProcessExploreResponse = "PROCESS_EXPLORE_RESPONSE",
  ProcessRelatedResponse = "PROCESS_RELATED_RESPONSE",
  ResetExploreResponse = "RESET_EXPLORE_RESPONSE",
  ResetState = "RESET_STATE",
  SelectEntityType = "SELECT_ENTITY_TYPE",
  ToggleEntityView = "TOGGLE_ENTITY_VIEW",
  UpdateColumnVisibility = "UPDATE_COLUMN_VISIBILITY",
  UpdateFilter = "UPDATE_FILTER",
  UpdateSorting = "UPDATE_SORTING",
}

/**
 * Explore action.
 */
export type ExploreAction =
  | ClearFiltersAction
  | PaginateTableAction
  | ProcessExploreResponseAction
  | ProcessRelatedResponseAction
  | ResetExploreResponseAction
  | ResetStateAction
  | SelectEntityTypeAction
  | ToggleEntityViewAction
  | UpdateColumnVisibilityAction
  | UpdateFilterAction
  | UpdateSortingAction;

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
 * Toggle entity view.
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
 * Update filter action.
 */
type UpdateFilterAction = {
  payload: UpdateFilterPayload;
  type: ExploreActionKind.UpdateFilter;
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
     * Clear all filters
     **/
    case ExploreActionKind.ClearFilters: {
      const filterCount = 0;
      const filterState: SelectedFilter[] = [];
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { filterCount, filterState }
        ),
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
     * Process explore response
     **/
    case ExploreActionKind.ProcessExploreResponse: {
      const { entityPageState, tabValue } = state;
      const { categoryConfigs, categoryViews, filterState } =
        entityPageState[tabValue];
      const nextCategoryViews = payload.selectCategories
        ? buildCategoryViews(
            payload.selectCategories,
            categoryConfigs,
            filterState
          )
        : undefined;
      return {
        ...state,
        categoryGroupConfigs: entityPageState[tabValue].categoryGroupConfigs,
        categoryViews: nextCategoryViews ?? categoryViews,
        entityPageState: updateEntityPageState(tabValue, entityPageState, {
          categoryViews: nextCategoryViews ?? categoryViews,
        }),
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
      return initExploreState(config, entityList, "");
    }
    /**
     * Select entity type
     **/
    case ExploreActionKind.SelectEntityType: {
      if (payload === state.tabValue) {
        return state;
      }
      return {
        ...state,
        filterCount: state.entityPageState[payload].filterCount,
        filterState: state.entityPageState[payload].filterState,
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
     * Update filter
     **/
    case ExploreActionKind.UpdateFilter: {
      const filterState = buildNextFilterState(
        state.filterState,
        payload.categoryKey,
        payload.selectedValue,
        payload.selected
      );
      const filterCount = getFilterCount(filterState);
      return {
        ...state,
        entityPageState: updateEntityPageState(
          state.tabValue,
          state.entityPageState,
          { filterCount, filterState }
        ),
        filterCount,
        filterState,
        paginationState: resetPage(state.paginationState),
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

    default:
      return state;
  }
}
