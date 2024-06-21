import { CategoryGroup } from "../../../config/entities";
import { ExploreState, PaginationState } from "../../exploreState";
import { SELECT_CATEGORY_KEY } from "../constants";
import { EntityState } from "../entities";

export const DEFAULT_CATEGORY_GROUP_SAVED_FILTERS: CategoryGroup = {
  categoryConfigs: [
    { key: SELECT_CATEGORY_KEY.SAVED_FILTERS, label: "Saved Filters" },
  ],
};

export const DEFAULT_ENTITY_STATE: EntityState = {
  categoryViews: [],
  filterState: [],
  savedFilterState: [],
  savedSelectCategories: [],
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
  listItems: [],
  loading: true,
  paginationState: DEFAULT_PAGINATION_STATE,
  tabValue: "",
};
