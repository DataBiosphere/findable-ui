import { ExploreState, PaginationState } from "../exploreState";

// Template constants
export const DEFAULT_PAGINATION_STATE: PaginationState = {
  currentPage: 1,
  index: null,
  nextIndex: null,
  pageSize: 25,
  pages: 1,
  previousIndex: null,
  rows: 0,
};

// Initial state
export const INITIAL_STATE: ExploreState = {
  catalogState: undefined,
  categoryViews: [],
  entityPageState: {},
  featureFlagState: undefined,
  filterCount: 0,
  filterState: [],
  isRelatedView: false,
  listItems: [],
  listView: undefined,
  loading: true,
  paginationState: DEFAULT_PAGINATION_STATE,
  relatedListItems: undefined,
  tabValue: "",
};
