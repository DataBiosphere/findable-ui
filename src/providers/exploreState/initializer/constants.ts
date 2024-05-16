import { ExploreState, PaginationState } from "../../exploreState";
import { EntityState } from "../entities";

export const DEFAULT_ENTITY_STATE: EntityState = {
  categoryViews: [],
  filterState: [],
};

export const DEFAULT_PAGINATION_STATE: PaginationState = {
  currentPage: 1,
  index: null,
  nextIndex: null,
  pageSize: 25,
  pages: 1,
  previousIndex: null,
  rows: 0,
};

export const INITIAL_STATE: ExploreState = {
  catalogState: undefined,
  categoryViews: [],
  entityPageState: {},
  entityStateByCategoryGroupConfigKey: new Map(),
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
