import { ColumnSort } from "@tanstack/react-table";
import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { AzulSearchIndex } from "../apis/azul/common/entities";
import {
  CategoryKey,
  CategoryValueKey,
  PaginationDirectionType,
  SelectCategory,
  SelectedFilter,
} from "../common/entities";
import { EntityConfig, SiteConfig } from "../config/entities";
import { getDefaultSorting } from "../config/utils";
import {
  buildCategoryViews,
  buildNextFilterState,
} from "../hooks/useCategoryFilter";
import { useConfig } from "../hooks/useConfig";

// Template constants
const defaultPaginationState = {
  currentPage: 1,
  index: null,
  nextIndex: null,
  pageSize: 25,
  pages: 1,
  previousIndex: null,
  rows: 0,
};

/**
 * Entity view.
 */
export enum EntityView {
  EXACT = "EXACT",
  RELATED = "RELATED",
}

/**
 * Explore context.
 */
export interface ExploreContext {
  config: SiteConfig;
  entityConfig: EntityConfig;
}

/**
 * Explore response.
 */
export interface ExploreResponse {
  listItems: ListItems;
  loading: boolean;
  paginationResponse: PaginationResponse;
  selectCategories: SelectCategory[];
}

/**
 * Explore state.
 */
export type ExploreState = {
  categoryViews: SelectCategory[];
  filterState: SelectedFilter[];
  isRelatedView: boolean;
  listItems: ListItems;
  listStaticLoad: boolean;
  listView: EntityView | undefined;
  loading: boolean;
  paginationState: PaginationState;
  relatedListItems: RelatedListItems;
  sorting: ColumnSort[];
  tabValue: string;
};

/**
 * Model of explore state context.
 */
export interface ExploreStateContextProps {
  exploreDispatch: Dispatch<ExploreAction>;
  exploreState: ExploreState;
}

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
 * Related response.
 */
export interface RelatedResponse {
  relatedListItems: RelatedListItems;
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
  exploreState: {
    categoryViews: [],
    filterState: [],
    isRelatedView: false,
    listItems: [],
    listStaticLoad: false,
    listView: undefined,
    loading: false,
    paginationState: defaultPaginationState,
    relatedListItems: undefined,
    sorting: [],
    tabValue: "",
  },
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
  const { config, defaultEntityListType, entityConfig } = useConfig();
  const [exploreState, exploreDispatch] = useReducer(
    (s: ExploreState, a: ExploreAction) =>
      exploreReducer(s, a, { config, entityConfig }),
    {
      categoryViews: [],
      filterState: [],
      isRelatedView: false,
      listItems: [],
      listStaticLoad: entityConfig.staticLoad ?? false,
      listView: EntityView.EXACT,
      loading: true,
      paginationState: defaultPaginationState,
      relatedListItems: undefined,
      sorting: getDefaultSorting(entityConfig),
      tabValue: entityListType || defaultEntityListType,
    }
  );

  return (
    <ExploreStateContext.Provider value={{ exploreDispatch, exploreState }}>
      {children}
    </ExploreStateContext.Provider>
  );
}

/**
 * Explore action kind.
 */
export enum ExploreActionKind {
  // ClearFilters = "CLEAR_FILTERS",
  PaginateTable = "PAGINATE_TABLE",
  ProcessExploreResponse = "PROCESS_EXPLORE_RESPONSE",
  ProcessRelatedResponse = "PROCESS_RELATED_RESPONSE",
  SelectEntityType = "SELECT_ENTITY_TYPE",
  ToggleEntityView = "TOGGLE_ENTITY_VIEW",
  UpdateFilter = "UPDATE_FILTER",
  UpdateSorting = "UPDATE_SORTING",
}

/**
 * Explore action.
 */
type ExploreAction =
  | PaginateTableAction
  | ProcessExploreResponseAction
  | ProcessRelatedResponseAction
  | SelectEntityTypeAction
  | ToggleEntityView
  | UpdateFilterAction
  | UpdateSortingAction;

/**
 * Paginate table action.
 */
type PaginateTableAction = {
  payload: PaginationDirectionType;
  type: ExploreActionKind.PaginateTable;
};

/**
 * Process explore response action.
 */
type ProcessExploreResponseAction = {
  payload: ExploreResponse;
  type: ExploreActionKind.ProcessExploreResponse;
};

/**
 * Process related response action.
 */
type ProcessRelatedResponseAction = {
  payload: RelatedResponse;
  type: ExploreActionKind.ProcessRelatedResponse;
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
type ToggleEntityView = {
  payload: EntityView;
  type: ExploreActionKind.ToggleEntityView;
};

/**
 * Update filter action.
 */
type UpdateFilterAction = {
  payload: UpdateFilterPayload;
  type: ExploreActionKind.UpdateFilter;
};

/**
 * Update filter payload.
 */
type UpdateFilterPayload = {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
};

/**
 * Update sorting action.
 */
type UpdateSortingAction = {
  payload: ColumnSort[];
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
  const { config, entityConfig } = exploreContext;
  const { categoryConfigs } = config;

  switch (type) {
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
      let listItems: ListItems = [];
      if (!payload.loading) {
        listItems = payload.listItems;
      }
      return {
        ...state,
        categoryViews: buildCategoryViews(
          payload.selectCategories,
          categoryConfigs,
          state.filterState
        ),
        listItems: listItems,
        loading: payload.loading,
        paginationState: {
          currentPage: state.paginationState.currentPage,
          index: state.paginationState.index,
          nextIndex: payload.paginationResponse.nextIndex,
          pageSize: payload.paginationResponse.pageSize,
          pages: payload.paginationResponse.pages,
          previousIndex: payload.paginationResponse.previousIndex,
          rows: payload.paginationResponse.rows,
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
     * Select entity type
     **/
    case ExploreActionKind.SelectEntityType: {
      if (payload === state.tabValue) {
        return state;
      }
      const nextSort = getDefaultSorting(entityConfig);
      const { staticLoad } = entityConfig;
      const listStaticLoad = staticLoad;

      return {
        ...state,
        listItems: [],
        listStaticLoad,
        loading: true,
        paginationState: resetPage(state.paginationState),
        sorting: nextSort,
        tabValue: payload,
      };
    }
    /**
     * Toggle entity view
     */
    case ExploreActionKind.ToggleEntityView: {
      return {
        ...state,
        isRelatedView: payload === EntityView.RELATED,
        listView: payload,
      };
    }
    /**
     * Update filter
     **/
    case ExploreActionKind.UpdateFilter: {
      return {
        ...state,
        filterState: buildNextFilterState(
          state.filterState,
          payload.categoryKey,
          payload.selectedValue,
          payload.selected
        ),
        paginationState: resetPage(state.paginationState),
      };
    }
    /**
     * Update sorting
     **/
    case ExploreActionKind.UpdateSorting: {
      return {
        ...state,
        paginationState: resetPage(state.paginationState),
        sorting: payload,
      };
    }
    default:
      return state;
  }
}

/**
 * Resets pagination.
 * @param paginationState - Pagination state.
 * @returns a reset pagination state.
 */
function resetPage(paginationState: PaginationState): PaginationState {
  const nextPaginationState = { ...paginationState };
  nextPaginationState.index = null;
  nextPaginationState.currentPage = 1;

  return nextPaginationState;
}
